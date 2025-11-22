
# **AI Voice Agents – Complete Setup Guide (Windows)**

## **Step 0: Requirements**

Make sure you have:

* **Python 3.9+**
* **Node.js 18+**
* **Git**
* **VSCode or Terminal**
* **LiveKit account** ([Sign up](https://livekit.io/))
* **Murf.ai account** for Falcon TTS API key

---

## **Step 1: Prepare Project**

1. Clone the challenge repository:

```cmd
cd C:\Users\CJ Darcl\Desktop\10DaysMurfChallenge
git clone https://github.com/murf-ai/ten-days-of-voice-agents-2025.git
cd ten-days-of-voice-agents-2025
```

2. Install **UV package manager** (already done)
3. Install **pnpm** for frontend if needed:

```cmd
npm install -g pnpm
```

---

## **Step 2: Authenticate LiveKit CLI**

1. Install LiveKit CLI:

```cmd
winget install LiveKit.LiveKitCLI
```

2. Authenticate:

```cmd
lk cloud auth
```

* Enter a friendly **device name**, e.g., `CJ-Laptop`
* Log in via the browser
* After successful login, CLI is linked to your account

---

## **Step 3: Set Environment Variables**

1. **Backend** (`backend/.env.local`):

```text
LIVEKIT_URL=wss://<your-project>.livekit.cloud
LIVEKIT_API_KEY=<your LiveKit API Key>
LIVEKIT_API_SECRET=<your LiveKit API Secret>
MURF_API_KEY=<your Murf Falcon API Key>
GOOGLE_API_KEY=<optional>
DEEPGRAM_API_KEY=<optional>
```

2. **Frontend** (`frontend/.env.local`):

```text
NEXT_PUBLIC_LIVEKIT_URL=wss://<your-project>.livekit.cloud
NEXT_PUBLIC_LIVEKIT_API_KEY=<your LiveKit API Key>
NEXT_PUBLIC_LIVEKIT_API_SECRET=<your LiveKit API Secret>
NEXT_PUBLIC_MURF_API_KEY=<your Murf Falcon API Key>
```

> **Important:** Frontend variables must have `NEXT_PUBLIC_` prefix.

3. Populate automatically with CLI (optional):

```cmd
cd backend
lk app env -w -d .env.local
```

---

## **Step 4: Install Dependencies**

1. **Backend:**

```cmd
cd backend
uv sync
```

2. **Frontend:**

```cmd
cd frontend
pnpm install
```

---

## **Step 5: Download Required AI Models**

Run in **backend**:

```cmd
uv run python src/agent.py download-files
```

* Downloads models like `model_q8.onnx`
* Required for inference & turn detection

---

## **Step 6: Run Backend Agent**

```cmd
cd backend
uv run python src/agent.py dev
```

* You should see logs:

```
starting inference executor
process initialized
```

* If errors about models appear → ensure **Step 5** was successful

---

## **Step 7: Run Frontend**

```cmd
cd frontend
pnpm dev
```

* Open browser: [http://localhost:3000](http://localhost:3000)
* Interact with your AI Voice Agent

---

## **Step 8: Optional — Deploy Agent on LiveKit**

1. Create new agent:

```cmd
lk agent create
```

* Follow prompts: **name, description**

2. Check logs:

```cmd
lk agent logs <agent-name>
```

3. Restart agent if needed:

```cmd
lk agent restart <agent-name>
```

---

## **Step 9: Verify Everything**

* Backend logs: inference running ✅
* Frontend: connects and interacts with agent ✅
* Murf Falcon TTS: outputs audio ✅
* LiveKit Cloud: your agent is registered ✅

---

### **Tips**

* Always restart frontend when `.env.local` changes
* Ensure `uv run python src/agent.py download-files` is completed **before running dev**
* Keep LiveKit CLI authenticated if switching devices

---
