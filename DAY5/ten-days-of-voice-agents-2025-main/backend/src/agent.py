# backend/src/agent.py
import json
import os
import asyncio
from datetime import datetime
from typing import Annotated, Optional
from dataclasses import dataclass, field

print("\n" + "="*80)
print("DAY 5 – ZOMATO SDR + LEAD CAPTURE + DEMO BOOKING + EMAIL DRAFT")
print("Powered by Murf Falcon – The Fastest & Most Natural Voice")
print("="*80 + "\n")

from dotenv import load_dotenv
load_dotenv(".env.local")

from livekit.agents import Agent, AgentSession, JobContext, JobProcess, RoomInputOptions, WorkerOptions, cli, function_tool, RunContext
from livekit.plugins import murf, deepgram, google, silero, noise_cancellation
from livekit.plugins.turn_detector.multilingual import MultilingualModel

# Load Zomato FAQ
FAQ_FILE = "shared-data/zomato_faq.json"
os.makedirs("shared-data", exist_ok=True)
if not os.path.exists(FAQ_FILE):
    print("Creating Zomato FAQ...")
    with open(FAQ_FILE, "w", encoding="utf-8") as f:
        json.dump([
            {"question": "What is Zomato?", "answer": "Zomato is India's largest food delivery platform..."},
            # ... (full FAQ above)
        ], f, indent=4)

with open(FAQ_FILE, "r", encoding="utf-8") as f:
    ZOMATO_FAQ = json.load(f)

# Mock Calendar
AVAILABLE_SLOTS = [
    "Tomorrow at 11:00 AM IST",
    "Tomorrow at 3:00 PM IST",
    "Day after at 10:30 AM IST",
    "Day after at 4:00 PM IST"
]

@dataclass
class Lead:
    name: str = ""
    company: str = ""
    email: str = ""
    role: str = ""
    use_case: str = ""
    team_size: str = ""
    timeline: str = ""
    booked_slot: str = ""

@dataclass
class UserData:
    lead: Lead = field(default_factory=Lead)
    session: Optional[AgentSession] = None
    collected_fields: set = field(default_factory=set)
    conversation_ended: bool = False

def save_lead(lead: Lead):
    data = {
        "timestamp": datetime.now().isoformat(),
        "name": lead.name,
        "company": lead.company,
        "email": lead.email,
        "role": lead.role,
        "use_case": lead.use_case,
        "team_size": lead.team_size,
        "timeline": lead.timeline,
        "booked_demo": lead.booked_slot or "Not booked"
    }
    with open("leads/zomato_leads.jsonl", "a", encoding="utf-8") as f:
        f.write(json.dumps(data, ensure_ascii=False) + "\n")

    # Follow-up Email Draft
    email_draft = {
        "subject": f"Thanks {lead.name.split()[0] if lead.name else ''} — Let's Get Your Restaurant on Zomato!",
        "body": f"Hi {lead.name.split()[0] if lead.name else 'there'},\n\n"
                f"Thanks for chatting with me today! I heard you're from {lead.company or 'your company'} and looking to {lead.use_case or 'grow your restaurant business'}.\n\n"
                f"You're a great fit for Zomato Partner Platform. I've reserved a demo slot for you:\n"
                f"→ {lead.booked_slot or 'Any time that works!'}\n\n"
                f"Reply to this email to confirm or pick a better time.\n\n"
                f"Looking forward to helping you get more orders!\n"
                f"Best,\nAarav\nSDR @ Zomato"
    }
    os.makedirs("email_drafts", exist_ok=True)
    with open(f"email_drafts/{lead.email or 'unknown'}_{int(datetime.now().timestamp())}.json", "w") as f:
        json.dump(email_draft, f, indent=2)

@function_tool
async def answer_zomato_question(ctx: RunContext[UserData], question: Annotated[str, "User's question about Zomato"]) -> str:
    question_lower = question.lower()
    for item in ZOMATO_FAQ:
        if any(keyword in question_lower for keyword in item["question"].lower().split()):
            return item["answer"]
    return "That's a great question! Zomato helps restaurants get more orders through our app. We charge only per order — no upfront fees. Want me to explain how it works for your restaurant?"

@function_tool
async def collect_lead_info(ctx: RunContext[UserData], field: Annotated[str, "name/company/email/role/use_case/team_size/timeline"]) -> str:
    userdata = ctx.userdata
    field = field.lower().strip()
    if field in userdata.collected_fields:
        return f"Got it, you already told me your {field.replace('_', ' ')}."
    
    await ctx.userdata.session.say(f"Sure! What's your {field.replace('_', ' ')}?")
    return f"Asking for {field}..."

@function_tool
async def book_demo_slot(ctx: RunContext[UserData], slot_index: Annotated[int, "0-3"]) -> str:
    if 0 <= slot_index < len(AVAILABLE_SLOTS):
        slot = AVAILABLE_SLOTS[slot_index]
        ctx.userdata.lead.booked_slot = slot
        return f"Perfect! I've booked you for {slot}. I'll send a calendar invite to {ctx.userdata.lead.email or 'your email'} shortly!"
    return "Sorry, that slot isn't available. Say 'show slots' to see options."

@function_tool
async def show_available_slots(ctx: RunContext[UserData]) -> str:
    slots = "\n".join([f"{i+1}. {slot}" for i, slot in enumerate(AVAILABLE_SLOTS)])
    return f"Here are the available demo slots:\n{slots}\nJust say the number!"

class ZomatoSDR(Agent):
    def __init__(self):
        super().__init__(
            instructions="""
You are Aarav, a friendly and professional Sales Development Rep (SDR) for Zomato Partner Platform.

Your job:
- Greet warmly and build rapport
- Answer questions about Zomato using only the provided FAQ
- Naturally collect: name, company, email, role, use case, team size, timeline
- Offer to book a demo when interest is shown
- At the end, summarize and thank them

Be conversational, never robotic. Use Indian English tone.
""",
            tools=[answer_zomato_question, collect_lead_info, book_demo_slot, show_available_slots]
        )

def prewarm(proc: JobProcess):
    proc.userdata["vad"] = silero.VAD.load()

async def entrypoint(ctx: JobContext):
    userdata = UserData()
    os.makedirs("leads", exist_ok=True)

    session = AgentSession(
        stt=deepgram.STT(model="nova-3"),
        llm=google.LLM(model="gemini-2.5-flash"),
        tts=murf.TTS(voice="en-IN-aarav", style="Friendly", speed=1.05),
        turn_detection=MultilingualModel(),
        vad=ctx.proc.userdata["vad"],
        userdata=userdata,
    )
    userdata.session = session

    await session.start(agent=ZomatoSDR(), room=ctx.room, room_input_options=RoomInputOptions(noise_cancellation=noise_cancellation.BVC()))
    await ctx.connect(auto_subscribe=True)

    await asyncio.sleep(1)
    await session.say(
        "Namaste! This is Aarav from Zomato Partner Team! Thanks for stopping by!\n\n"
        "Are you a restaurant owner or do you help manage one? I'd love to show you how thousands of restaurants are getting more orders with Zomato!",
        allow_interruptions=True
    )

if __name__ == "__main__":
    cli.run_app(WorkerOptions(entrypoint_fnc=entrypoint, prewarm_fnc=prewarm))