import logging
import json

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


class Assistant(Agent):
    def __init__(self) -> None:
        super().__init__(
            instructions="""You are a friendly coffee shop barista working at Blue Tokai Coffee.
            Your job is to take coffee orders from customers using voice.

            You must ask questions one-by-one until ALL the following fields are filled:

            drinkType (e.g., Latte, Cappuccino, Cold Brew)
            size (Small, Medium, Large)
            milk (Regular, Almond, Oat, Soy)
            extras (list: e.g., whipped cream, caramel, chocolate syrup)
            name (customer's name)

            Always confirm the user’s answer and then move to the next missing field.

            When all fields are filled:
            1. Speak a friendly confirmation.
            2. Save the order to order.json.
            3. Then ask: “Would you like to order anything else?”""",
        )


# ----------------------------
# GLOBAL ORDER STATE (correct place)
# ----------------------------
order_state = {
    "drinkType": None,
    "size": None,
    "milk": None,
    "extras": [],
    "name": None
}


# ----------------------------
# SAVE ORDER FUNCTION
# ----------------------------
def save_order():
    with open("order.json", "w") as f:
        json.dump(order_state, f, indent=4)


def prewarm(proc: JobProcess):
    proc.userdata["vad"] = silero.VAD.load()


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

    usage_collector = metrics.UsageCollector()

    @session.on("metrics_collected")
    def _on_metrics_collected(ev: MetricsCollectedEvent):
        metrics.log_metrics(ev.metrics)
        usage_collector.collect(ev.metrics)

    async def log_usage():
        summary = usage_collector.get_summary()
        logger.info(f"Usage: {summary}")

    ctx.add_shutdown_callback(log_usage)

    await session.start(
        agent=Assistant(),
        room=ctx.room,
        room_input_options=RoomInputOptions(
            noise_cancellation=noise_cancellation.BVC(),
        ),
    )

    # ----------------------------
    # TRANSCRIPTION HANDLER
    # ----------------------------
    @session.on("transcription")
    async def handle_transcription(ev):
        text = ev.text.lower()

        global order_state

        # drink type
        if order_state["drinkType"] is None:
            order_state["drinkType"] = text
            await session.say("Great choice! What size would you like?")
            return

        # size
        if order_state["size"] is None:
            order_state["size"] = text
            await session.say("Nice! What milk do you prefer?")
            return

        # milk
        if order_state["milk"] is None:
            order_state["milk"] = text
            await session.say("Any extras like whipped cream or caramel?")
            return

        # extras
        if order_state["extras"] == []:
            if "no" in text:
                order_state["extras"] = []
            else:
                order_state["extras"] = [text]
            await session.say("Almost done! What is your name?")
            return

        # name
        if order_state["name"] is None:
            order_state["name"] = text
            save_order()
            await session.say("Thank you! Your order has been saved. Anything else?")
            return

    await ctx.connect()


if __name__ == "__main__":
    cli.run_app(WorkerOptions(entrypoint_fnc=entrypoint, prewarm_fnc=prewarm))
