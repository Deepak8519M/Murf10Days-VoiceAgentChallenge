import logging
import json
import os

from dotenv import load_dotenv
from livekit.agents import (
    Agent,
    AgentSession,
    JobContext,
    JobProcess,
    MetricsCollectedEvent,
    RoomInputOptions,
    WorkerOptions,
    cli,
    metrics,
    tokenize,
)
from livekit.plugins import murf, silero, google, deepgram, noise_cancellation
from livekit.plugins.turn_detector.multilingual import MultilingualModel

logger = logging.getLogger("agent")

load_dotenv(".env.local")

# ----------------------------
# AGENT INSTRUCTIONS
# ----------------------------
class Assistant(Agent):
    def __init__(self) -> None:
        super().__init__(
            instructions="""
            You are a friendly coffee shop barista working at Blue Tokai Coffee.

            Your job is to take coffee orders using voice.
            
            You must ask questions one-by-one until ALL the fields are filled:
            
            • drinkType (Latte, Cappuccino, Cold Brew…)
            • size (Small / Medium / Large)
            • milk (Regular / Almond / Oat / Soy)
            • extras (whipped cream, caramel, mocha…)
            • name (user name)
            
            When ALL fields are filled:
            1. Confirm the order.
            2. Save it to order.json
            3. Ask: “Would you like to order anything else?”
            """
        )

# ----------------------------
# ORDER STATE — GLOBAL
# ----------------------------
order_state = {
    "drinkType": None,
    "size": None,
    "milk": None,
    "extras": [],
    "name": None,
}

# ----------------------------
# SAVE ORDER FUNCTION
# ----------------------------
def save_order():
    path = os.path.join(os.getcwd(), "order.json")
    print("\n🔥 Saving order to:", path, "\n")

    with open(path, "w") as f:
        json.dump(order_state, f, indent=4)

# ----------------------------
# PREWARM
# ----------------------------
def prewarm(proc: JobProcess):
    proc.userdata["vad"] = silero.VAD.load()

# ----------------------------
# ENTRYPOINT
# ----------------------------
async def entrypoint(ctx: JobContext):
    ctx.log_context_fields = {"room": ctx.room.name}

    session = AgentSession(
        stt=deepgram.STT(model="nova-3"),
        llm=google.LLM(model="gemini-2.5-flash"),
        tts=murf.TTS(
            voice="en-US-matthew",
            style="Conversation",
            tokenizer=tokenize.basic.SentenceTokenizer(min_sentence_len=2),
            text_pacing=True
        ),
        turn_detection=MultilingualModel(),
        vad=ctx.proc.userdata["vad"],
        preemptive_generation=True,
    )

    # ----------------------------
    # METRICS
    # ----------------------------
    usage_collector = metrics.UsageCollector()

    @session.on("metrics_collected")
    def _on_metrics_collected(ev: MetricsCollectedEvent):
        metrics.log_metrics(ev.metrics)
        usage_collector.collect(ev.metrics)

    async def log_usage():
        summary = usage_collector.get_summary()
        logger.info(f"Usage: {summary}")

    ctx.add_shutdown_callback(log_usage)

    # ----------------------------
    # START SESSION
    # ----------------------------
    await session.start(
        agent=Assistant(),
        room=ctx.room,
        room_input_options=RoomInputOptions(
            noise_cancellation=noise_cancellation.BVC()
        ),
    )

    # ----------------------------
    # HANDLE TRANSCRIPTIONS
    # ----------------------------
    @session.on("transcription")
    async def handle_transcription(ev):
        text = ev.text.lower()
        print("👂 Heard:", text)

        global order_state

        # 1. drink type
        if order_state["drinkType"] is None:
            order_state["drinkType"] = text
            await session.say("Great choice! What size would you like?")
            return

        # 2. size
        if order_state["size"] is None:
            order_state["size"] = text
            await session.say("Nice! What milk do you prefer?")
            return

        # 3. milk
        if order_state["milk"] is None:
            order_state["milk"] = text
            await session.say("Any extras like whipped cream or caramel?")
            return

        # 4. extras
        if order_state["extras"] == []:
            if "no" in text:
                order_state["extras"] = []
            else:
                order_state["extras"] = [text]
            await session.say("Almost done! What is your name?")
            return

        # 5. customer name
        if order_state["name"] is None:
            order_state["name"] = text

            # SAVE FILE
            save_order()

            await session.say(
                "Thank you! Your order has been saved. Would you like anything else?"
            )
            return

    await ctx.connect()


# ----------------------------
# RUN WORKER
# ----------------------------
if __name__ == "__main__":
    cli.run_app(WorkerOptions(entrypoint_fnc=entrypoint, prewarm_fnc=prewarm))
