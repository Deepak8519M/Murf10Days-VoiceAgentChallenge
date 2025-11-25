# backend/src/agent.py
import logging
import json
import os
import asyncio
from typing import Annotated, Optional
from dataclasses import dataclass, field

print("\n" + "="*80)
print("DAY 4 – CSE ACTIVE RECALL COACH (Variables • Loops • Functions)")
print("VOICE SWITCHING: Matthew → Alicia → Ken | Murf Falcon Powered")
print("="*80 + "\n")

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

# ======================================================
# CSE KNOWLEDGE BASE (Computer Science)
# ======================================================
CONTENT_FILE = "shared-data/cse_content.json"

CSE_CONTENT = [
    {
        "id": "variables",
        "title": "Variables",
        "summary": "Variables are named containers that store data in memory. They have a name, a type, and a value that can change during execution. Example: `age = 25`",
        "sample_question": "What is a variable in programming and why do we use them?"
    },
    {
        "id": "loops",
        "title": "Loops",
        "summary": "Loops allow you to repeat a block of code multiple times. There are two main types: 'for' loops (known iterations) and 'while' loops (condition-based).",
        "sample_question": "Explain the difference between a for loop and a while loop with an example."
    },
    {
        "id": "functions",
        "title": "Functions",
        "summary": "Functions are reusable blocks of code that perform a specific task. They help organize code, reduce repetition, and improve readability. You define them once and call them anywhere.",
        "sample_question": "What is a function? Why should we use functions in our code?"
    }
]

def load_cse_content():
    os.makedirs("shared-data", exist_ok=True)
    if not os.path.exists(CONTENT_FILE):
        with open(CONTENT_FILE, "w", encoding="utf-8") as f:
            json.dump(CSE_CONTENT, f, indent=4)
        print("CSE content created → shared-data/cse_content.json")
    with open(CONTENT_FILE, "r", encoding="utf-8") as f:
        return json.load(f)

COURSE_CONTENT = load_cse_content()
TOPIC_MAP = {item["id"]: item for item in COURSE_CONTENT}

# ======================================================
# STATE — SAFE WITH default_factory
# ======================================================
@dataclass
class TutorState:
    current_topic_id: Optional[str] = None
    current_topic_data: Optional[dict] = None
    mode: str = "learn"

@dataclass
class Userdata:
    tutor_state: TutorState = field(default_factory=TutorState)
    session: Optional[AgentSession] = None

# ======================================================
# TOOLS
# ======================================================
@function_tool
async def select_topic(
    ctx: RunContext[Userdata],
    topic_id: Annotated[str, "Topic: variables, loops, functions"]
) -> str:
    topic_id = topic_id.lower().strip()
    topic = TOPIC_MAP.get(topic_id)
    if not topic:
        return "Topic not found. Try: variables, loops, functions"
    
    ctx.userdata.tutor_state.current_topic_id = topic_id
    ctx.userdata.tutor_state.current_topic_data = topic
    return f"Got it! We're now studying **{topic['title']}**.\nSay: learn, quiz, or teach me back!"

@function_tool
async def set_learning_mode(
    ctx: RunContext[Userdata],
    mode: Annotated[str, "Mode: learn, quiz, teach_back"]
) -> str:
    state = ctx.userdata.tutor_state
    mode = mode.lower().strip()

    if not state.current_topic_data:
        return "Please choose a topic first! Say: variables, loops, or functions"

    state.mode = mode
    session = ctx.userdata.session
    if not session:
        return "Session not ready."

    try:
        if mode == "learn":
            session.tts.update_options(voice="en-US-matthew", style="Conversational", speed=0.95)
            return f"**{state.current_topic_data['title']}**\n\n{state.current_topic_data['summary']}\n\nMake sense?"

        elif mode == "quiz":
            session.tts.update_options(voice="en-US-alicia", style="Excited", speed=1.1)
            return f"Quiz time!\n\n{state.current_topic_data['sample_question']}\n\nGo ahead — what's your answer?"

        elif mode == "teach_back":
            session.tts.update_options(voice="en-US-ken", style="Friendly", speed=1.0)
            return f"Your turn to teach me **{state.current_topic_data['title']}**!\nExplain it like I'm a complete beginner. I'm ready!"

        else:
            return "Choose: learn, quiz, or teach_back"

    except Exception as e:
        print(f"TTS update failed: {e}")
        return f"Mode switched to {mode}! Let's go!"

@function_tool
async def list_topics(ctx: RunContext[Userdata]) -> str:
    topics = "\n".join([f"• {t['id']} → {t['title']}" for t in COURSE_CONTENT])
    return f"Available topics:\n{topics}"

# ======================================================
# MAIN CSE AGENT
# ======================================================
class CSETutor(Agent):
    def __init__(self):
        topic_list = ", ".join([f"{t['id']} ({t['title']})" for t in COURSE_CONTENT])
        super().__init__(
            instructions=f"""
You are a Computer Science Active Recall Coach helping beginners master core programming concepts.

Topics: {topic_list}

Three modes — voice changes automatically:
• learn → Matthew (calm, clear teacher)
• quiz → Alicia (energetic quiz master!)
• teach_back → Ken (supportive coach)

Rules:
1. Always ask user to pick a topic first
2. Use tools to switch modes safely
3. Never crash — always check if topic is selected
4. Be encouraging, patient, and fun!

Example flow:
User: "loops" → "Great! Say: learn, quiz, or teach me back"
User: "quiz" → Alicia asks question
User: "teach me back" → Ken listens
""",
            tools=[select_topic, set_learning_mode, list_topics]
        )

# ======================================================
# PREWARM & ENTRYPOINT
# ======================================================
def prewarm(proc: JobProcess):
    print("Prewarming VAD...")
    proc.userdata["vad"] = silero.VAD.load()

async def entrypoint(ctx: JobContext):
    print("DAY 4 – CSE ACTIVE RECALL COACH STARTED SUCCESSFULLY")

    userdata = Userdata()

    session = AgentSession(
        stt=deepgram.STT(model="nova-3"),
        llm=google.LLM(model="gemini-2.5-flash"),
        tts=murf.TTS(voice="en-US-matthew", style="Conversational"),
        turn_detection=MultilingualModel(),
        vad=ctx.proc.userdata["vad"],
        userdata=userdata,
    )

    userdata.session = session

    await session.start(
        agent=CSETutor(),
        room=ctx.room,
        room_input_options=RoomInputOptions(noise_cancellation=noise_cancellation.BVC()),
    )

    await ctx.connect(auto_subscribe=True)

    await asyncio.sleep(1)
    await session.say(
        "Hey there! I'm your CSE Active Recall Coach.\n\n"
        "We can master:\n"
        "• Variables\n"
        "• Loops\n"
        "• Functions\n\n"
        "Just say the topic to begin — for example: 'variables' or 'loops'!",
        allow_interruptions=True
    )

# ======================================================
# LAUNCH
# ======================================================
if __name__ == "__main__":
    print("\nLaunching Day 4 – CSE Active Recall Coach")
    print("Voice Switching: Matthew (Learn) • Alicia (Quiz) • Ken (Teach-back)")
    print("Powered by Murf Falcon – The Fastest & Most Natural TTS")
    print("="*80 + "\n")

    cli.run_app(WorkerOptions(entrypoint_fnc=entrypoint, prewarm_fnc=prewarm))