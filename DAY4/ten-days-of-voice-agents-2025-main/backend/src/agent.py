# backend/src/agent.py
import logging
import json
import os
from datetime import datetime
from typing import Annotated, List
from dataclasses import dataclass, field  # ← THIS WAS MISSING!

print("\n" + "="*60)
print("DAY 4 – TEACH THE TUTOR: ACTIVE RECALL COACH")
print("="*60 + "\n")

from dotenv import load_dotenv
load_dotenv(".env.local")

from livekit.agents import (
    Agent,
    AgentSession,
    JobContext,
    JobProcess,
    RoomInputOptions,
    WorkerOptions,
    cli,
    function_tool,
    RunContext,
)

from livekit.plugins import murf, silero, google, deepgram, noise_cancellation
from livekit.plugins.turn_detector.multilingual import MultilingualModel

logger = logging.getLogger("tutor-agent")

# ======================================================
# CONTENT: DAY 4 TUTOR CONCEPTS
# ======================================================
CONTENT_FILE = "shared-data/day4_tutor_content.json"

def load_concepts():
    if not os.path.exists(CONTENT_FILE):
        print(f"{CONTENT_FILE} not found! Creating default...")
        default = [
            {
                "id": "variables",
                "title": "Variables",
                "summary": "Variables are used to store data that can be reused throughout your program. They have a name and a value, and you can change the value anytime.",
                "sample_question": "What is a variable and why do we use them in programming?"
            },
            {
                "id": "loops",
                "title": "Loops",
                "summary": "Loops allow you to repeat a block of code multiple times. The two main types are 'for' loops (when you know how many times) and 'while' loops (when you don't).",
                "sample_question": "Explain the difference between a for loop and a while loop."
            },
            {
                "id": "functions",
                "title": "Functions",
                "summary": "Functions are reusable blocks of code that perform a specific task. You define them once and can call them anywhere with different inputs.",
                "sample_question": "What is a function and why should you use them?"
            }
        ]
        os.makedirs(os.path.dirname(CONTENT_FILE), exist_ok=True)
        with open(CONTENT_FILE, "w", encoding="utf-8") as f:
            json.dump(default, f, indent=2)
        return default
    
    with open(CONTENT_FILE, encoding="utf-8") as f:
        return json.load(f)

CONCEPTS = load_concepts()
CONCEPT_MAP = {c["id"]: c for c in CONCEPTS}

# ======================================================
# TUTOR STATE
# ======================================================
@dataclass
class TutorState:
    current_mode: str = "coordinator"  # coordinator, learn, quiz, teach_back
    current_concept: str = ""
    current_question: str = ""

@dataclass
class Userdata:
    tutor: TutorState = field(default_factory=TutorState)

# ======================================================
# FUNCTION TOOLS
# ======================================================

@function_tool
async def switch_to_learn_mode(
    ctx: RunContext[Userdata],
    concept_id: Annotated[str, "Concept: variables, loops, functions"]
):
    ctx.userdata.tutor.current_mode = "learn"
    ctx.userdata.tutor.current_concept = concept_id
    concept = CONCEPT_MAP.get(concept_id)
    if not concept:
        return "I don't know that concept. Try: variables, loops, functions."
    return f"Okay! Let me explain **{concept['title']}**:\n\n{concept['summary']}\n\nGot it?"

@function_tool
async def switch_to_quiz_mode(
    ctx: RunContext[Userdata],
    concept_id: Annotated[str, "Concept to quiz on"]
):
    ctx.userdata.tutor.current_mode = "quiz"
    ctx.userdata.tutor.current_concept = concept_id
    concept = CONCEPT_MAP.get(concept_id)
    if not concept:
        return "No quiz for that concept."
    question = concept["sample_question"]
    ctx.userdata.tutor.current_question = question
    return f"Quiz time!\n\n{question}\n\nYour answer?"

@function_tool
async def switch_to_teach_back_mode(
    ctx: RunContext[Userdata],
    concept_id: Annotated[str, "Concept to teach back"]
):
    ctx.userdata.tutor.current_mode = "teach_back"
    ctx.userdata.tutor.current_concept = concept_id
    concept = CONCEPT_MAP.get(concept_id)
    if not concept:
        return "I don't know that one."
    return f"Your turn to teach me!\n\nExplain **{concept['title']}** in your own words — like I'm a beginner. Go ahead!"

@function_tool
async def switch_mode(ctx: RunContext[Userdata], mode: Annotated[str, "learn, quiz, teach_back"]) -> str:
    if mode not in ["learn", "quiz", "teach_back"]:
        return "Choose: learn, quiz, or teach_back"
    ctx.userdata.tutor.current_mode = mode
    return f"Switched to {mode} mode! What concept?"

# ======================================================
# MAIN AGENT
# ======================================================
class ActiveRecallCoach(Agent):
    def __init__(self):
        instructions = f"""
You are an Active Recall Coach. Help master: {', '.join(c['title'] for c in CONCEPTS)}.

Modes:
- coordinator: main menu
- learn: explain concepts clearly
- quiz: ask questions, give positive feedback
- teach_back: listen, give kind specific feedback

Be warm, encouraging, human. Let user switch modes anytime.
Use tools to change modes and work with concepts.
"""
        super().__init__(
            instructions=instructions,
            tools=[
                switch_to_learn_mode,
                switch_to_quiz_mode,
                switch_to_teach_back_mode,
                switch_mode,
            ]
        )

# ======================================================
# PREWARM & ENTRYPOINT
# ======================================================
def prewarm(proc: JobProcess):
    print("Prewarming VAD...")
    proc.userdata["vad"] = silero.VAD.load()

async def entrypoint(ctx: JobContext):
    print("DAY 4 – ACTIVE RECALL COACH STARTED")

    userdata = Userdata()

    session = AgentSession(
        stt=deepgram.STT(model="nova-3"),
        llm=google.LLM(model="gemini-2.5-flash"),
        tts=murf.TTS(voice="en-US-matthew", style="Conversational", speed=1.0),
        turn_detection=MultilingualModel(),
        vad=ctx.proc.userdata["vad"],
        userdata=userdata,
    )

    await session.start(
        agent=ActiveRecallCoach(),
        room=ctx.room,
        room_input_options=RoomInputOptions(noise_cancellation=noise_cancellation.BVC()),
    )

    await ctx.connect(auto_subscribe=True)

    await asyncio.sleep(1)
    await session.say(
        "Hey! I'm your Active Recall Coach.\n\n"
        "I help you master programming by explaining, quizzing, and letting you teach me back — the best way to learn!\n\n"
        f"Concepts: {', '.join(c['title'] for c in CONCEPTS)}\n\n"
        "What would you like to do? Learn a concept, take a quiz, or teach me one?",
        allow_interruptions=True
    )

# ======================================================
# LAUNCH
# ======================================================
if __name__ == "__main__":
    print("\nLaunching Day 4 – Teach the Tutor: Active Recall Coach")
    print("Powered by Murf Falcon – The Fastest & Most Natural TTS")
    print("=" * 60 + "\n")

    cli.run_app(WorkerOptions(entrypoint_fnc=entrypoint, prewarm_fnc=prewarm))