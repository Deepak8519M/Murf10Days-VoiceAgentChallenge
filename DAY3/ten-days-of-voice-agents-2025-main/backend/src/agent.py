import logging
import json
import os
import asyncio
from datetime import datetime
from typing import Annotated, List
from dataclasses import dataclass, field

print("\n" + "Wellness" * 20)
print("Day 3 – Health & Wellness Voice Companion LOADED!")
print("Wellness" * 20 + "\n")

from dotenv import load_dotenv
from pydantic import Field  # ← THIS WAS MISSING!

from livekit.agents import (
    Agent,
    AgentSession,
    JobContext,
    JobProcess,
    RoomInputOptions,
    WorkerOptions,
    cli,
    metrics,
    MetricsCollectedEvent,
    RunContext,
    function_tool,
)

from livekit.plugins import murf, silero, google, deepgram, noise_cancellation
from livekit.plugins.turn_detector.multilingual import MultilingualModel

logger = logging.getLogger("wellness-agent")
load_dotenv(".env.local")

# ======================================================
# WELLNESS LOG PERSISTENCE
# ======================================================
WELLNESS_LOG_FILE = "wellness_log.json"

def load_wellness_history() -> List[dict]:
    if not os.path.exists(WELLNESS_LOG_FILE):
        return []
    try:
        with open(WELLNESS_LOG_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        print(f"Could not load history: {e}")
        return []

def save_wellness_entry(entry: dict):
    history = load_wellness_history()
    history.append(entry)
    with open(WELLNESS_LOG_FILE, "w", encoding="utf-8") as f:
        json.dump(history, f, indent=2, ensure_ascii=False)
    print(f"\nWELLNESS ENTRY SAVED → {entry['date']}")
    print(json.dumps(entry, indent=2))

# ======================================================
# USERDATA & STATE
# ======================================================
@dataclass
class WellnessState:
    mood: str | None = None
    energy_level: str | None = None
    goals: List[str] = field(default_factory=list)

    def is_complete(self) -> bool:
        return bool(self.mood and self.energy_level and self.goals)

@dataclass
class Userdata:
    wellness: WellnessState = field(default_factory=WellnessState)
    session_start: datetime = field(default_factory=datetime.now)
    memory_line: str = ""  # reference to last session

# ======================================================
# FUNCTION TOOLS
# ======================================================

@function_tool
async def record_mood(
    ctx: RunContext[Userdata],
    mood: Annotated[str, Field(description="How the user is feeling today (e.g. calm, stressed, happy, tired)")],
) -> str:
    ctx.userdata.wellness.mood = mood.strip()
    print(f"MOOD → {mood}")
    return f"Thanks for sharing — you're feeling {mood.lower()} today."

@function_tool
async def record_energy(
    ctx: RunContext[Userdata],
    energy: Annotated[str, Field(description="User's current energy level")],
) -> str:
    ctx.userdata.wellness.energy_level = energy.strip()
    print(f"ENERGY → {energy}")
    return f"got it — energy feels {energy.lower()}."

@function_tool
async def set_goals(
    ctx: RunContext[Userdata],
    goals: Annotated[List[str], Field(description="List of 1–3 realistic daily intentions/goals")],
) -> str:
    cleaned = [g.strip() for g in goals if g.strip()]
    ctx.userdata.wellness.goals = cleaned
    print(f"GOALS → {cleaned}")
    return f"perfect — today you're aiming to: {', '.join(cleaned) or 'take it easy'}."

@function_tool
async def complete_checkin(ctx: RunContext[Userdata]) -> str:
    w = ctx.userdata.wellness
    if not w.is_complete():
        missing = []
        if not w.mood: missing.append("mood")
        if not w.energy_level: missing.append("energy")
        if not w.goals: missing.append("goals")
        return f"almost done — just need your {', '.join(missing)}."

    entry = {
        "date": datetime.now().strftime("%Y-%m-%d"),
        "timestamp": datetime.now().isoformat(),
        "mood": w.mood,
        "energy": w.energy_level,
        "goals": w.goals,
        "summary": f"Feeling {w.mood.lower()} with {w.energy_level.lower()} energy."
    }
    save_wellness_entry(entry)

    recap = (
        f"Here's your check-in for today:\n"
        f"• Mood: {w.mood}\n"
        f"• Energy: {w.energy_level}\n"
        f"• Goals: {', '.join(w.goals)}\n\n"
        f"You've got this! See you tomorrow"
    )
    print("\nCHECK-IN COMPLETE & SAVED!")
    return recap

# ======================================================
# AGENT
# ======================================================
class WellnessCompanion(Agent):
    def __init__(self, memory_line: str = ""):
        instructions = f"""
You are a warm, supportive daily wellness companion — like a caring friend checking in.

NEVER diagnose or give medical advice.

Flow for every short session (2–4 min):
1. Greet warmly. If there's a memory line, use it naturally: "{memory_line}"
2. Ask how they're feeling (mood)
3. Ask about energy
4. Ask for 1–3 small realistic goals
5. Offer one tiny grounded suggestion (e.g. "maybe a short walk?")
6. Recap and confirm
7. Call complete_checkin when ready

Be encouraging, gentle, and human. Use light emojis. Today is {datetime.now().strftime("%A, %B %d, %Y")}.
"""
        super().__init__(
            instructions=instructions,
            tools=[record_mood, record_energy, set_goals, complete_checkin],
        )

# ======================================================
# PREWARM
# ======================================================
def prewarm(proc: JobProcess):
    print("Prewarming Silero VAD...")
    proc.userdata["vad"] = silero.VAD.load()

# ======================================================
# ENTRYPOINT
# ======================================================
async def entrypoint(ctx: JobContext):
    print("\nSTARTING DAY 3 WELLNESS COMPANION")

    # Load past check-in for memory
    history = load_wellness_history()
    memory_line = ""
    if history:
        last = history[-1]
        last_date = datetime.strptime(last["date"], "%Y-%m-%d").strftime("%A")
        memory_line = f"Last time on {last_date}, you were feeling {last['mood'].lower()}. How does today compare?"

    userdata = Userdata(memory_line=memory_line)

    session = AgentSession(
        stt=deepgram.STT(model="nova-3"),
        llm=google.LLM(model="gemini-2.5-flash"),
        tts=murf.TTS(
            voice="en-US-matthew",
            style="Conversational",
            speed=1.0,
        ),
        turn_detection=MultilingualModel(),
        vad=ctx.proc.userdata["vad"],
        userdata=userdata,
    )

    await session.start(
        agent=WellnessCompanion(memory_line=memory_line),
        room=ctx.room,
        room_input_options=RoomInputOptions(noise_cancellation=noise_cancellation.BVC()),
    )

    await ctx.connect(auto_subscribe=True)

    greeting = "Hey there, it's your daily wellness check-in. How are you feeling today?"
    if memory_line:
        greeting = f"Hey again! {memory_line} How are you feeling today?"

    await asyncio.sleep(1)
    await session.say(greeting, allow_interruptions=True)

# ======================================================
# LAUNCH
# ======================================================
if __name__ == "__main__":
    print("\nLaunching Day 3 – Health & Wellness Voice Companion")
    print("Powered by Murf Falcon – the FASTEST TTS API")
    print("Wellness" * 30 + "\n")

    cli.run_app(WorkerOptions(entrypoint_fnc=entrypoint, prewarm_fnc=prewarm))