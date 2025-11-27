Perfect! Since you now have **`uv` working in CMD**, you’re ready to start with the **AI Voice Agents Challenge** step by step. I’ll guide you in a **clear, beginner-friendly way**.

We’ll focus on **Day 1 setup** first so everything runs.

---

# **Step 0 — Your starting point**

You have:

* **VS Code** installed
* **uv** installed (works in CMD)
* The **challenge repository** downloaded (`10DaysMurfChallenge` folder)
* CMD terminal working (PowerShell blocked, so we’ll stick to CMD)

---

# **Step 1 — Open the repository in VS Code**

1. Open VS Code
2. Click **File → Open Folder**
3. Navigate to:

```
C:\Users\CJ Darcl\Desktop\10DaysMurfChallenge\ten-days-of-voice-agents-2025
```

4. Click **Select Folder**

Now the repo is open in VS Code.

---

# **Step 2 — Open CMD terminal in VS Code**

Since PowerShell is blocked, do this:

1. In VS Code, press `Ctrl + ~` to open terminal
2. Click the dropdown → **Select Default Profile** → choose **Command Prompt**
3. Open a **new terminal**

---

# **Step 3 — Backend setup**

1. Navigate to backend folder:

```cmd
cd backend
```

2. **Sync dependencies with uv**:

```cmd
uv sync
```

3. Copy environment file:

```cmd
copy .env.example .env.local
```

4. Edit `.env.local` to add your credentials:

* `LIVEKIT_URL`
* `LIVEKIT_API_KEY`
* `LIVEKIT_API_SECRET`
* `MURF_API_KEY`
* `GOOGLE_API_KEY`
* `DEEPGRAM_API_KEY`

You can edit this in VS Code directly.

5. Download required models:

```cmd
uv run python src/agent.py download-files

-----next-----

uv run python src/agent.py dev
```

---

# **Step 4 — Frontend setup**

1. Open new terminal in VS Code
2. Navigate to frontend:

```cmd
cd frontend
```

3. Install dependencies:

```cmd
npm install -g pnpm
pnpm install
```

4. Copy env file:

```cmd
copy .env.example .env.local
```

5. Edit `.env.local` with the **same LiveKit credentials** as backend.

---

# **Step 5 — Running the application**

There are **two options**:

### **Option A — Convenience script**

From the root folder (`ten-days-of-voice-agents-2025`):

```cmd
start_app.sh
```

> Note: Since it’s a `.sh` script, Windows may need **Git Bash** or **WSL** to run it. If you have Git Bash, right-click folder → **Git Bash Here** → run `./start_app.sh`

---

### **Option B — Run individually (recommended for Windows)**

1. **Terminal 1 — Backend**:

```cmd
cd backend
uv run python src/agent.py dev
```

2. **Terminal 2 — Frontend**:

```cmd
cd frontend
pnpm dev
```

3. Open browser: [http://localhost:3000](http://localhost:3000)

> You should now see your **AI Voice Agent app running**.

---

# **Step 6 — Daily Challenge Tasks**

* Each day you will get a new task: e.g., build a new voice agent with a persona
* You will modify files in **backend** (logic) and **frontend** (UI)
* After finishing, **push your code to GitHub** and share your progress on LinkedIn

---

# ✅ **Next immediate step for you**

Since uv is working now:

1. Open **CMD in VS Code**
2. Go to `backend` folder
3. Run:

```cmd
uv sync
copy .env.example .env.local
```

That’s **Step 3 started**.

Once you finish copying `.env.local`, I’ll guide you **exactly how to fill in the keys** safely for Day 1.

---

Do you want me to **guide you filling the `.env.local` keys step by step** next?

Ah! That error happens because **`pnpm` is not installed on your Windows system**. It’s the package manager the frontend uses (like `npm` or `yarn`).

Here’s how to fix it **quickly**:

---

## **Step 1 — Install Node.js**

* Make sure you have **Node.js 18+** installed:
  [Download Node.js LTS](https://nodejs.org/en/download/) → Install it
* This also installs `npm` automatically (we can use it to install `pnpm`).

---

## **Step 2 — Install pnpm**

Open **CMD** and run:

```cmd
npm install -g pnpm
```

* `-g` installs it **globally**, so you can use `pnpm` anywhere.
* Wait for it to finish — you should see something like:

```
+ pnpm@<version>
added 1 package
```

---

## **Step 3 — Verify installation**

Run:

```cmd
pnpm -v
```

* If it prints a version number → installed successfully. ✅

---

## **Step 4 — Run frontend**

Now go to your frontend folder:

```cmd
cd C:\Users\CJ Darcl\Desktop\10DaysMurfChallenge\ten-days-of-voice-agents-2025\frontend
pnpm install
pnpm dev
```

* Open browser → `http://localhost:3000`
* The frontend should run now.

---

💡 **Tip for Day 1:**

* If you just want to see **Murf TTS working**, you can even skip the frontend and test directly from backend logs.
* But frontend gives a **nice interface to type and hear the agent**.

---

If you want, I can make a **copy-paste “Day 1 full setup for Windows”** that installs everything, runs backend + frontend, and gets Murf TTS speaking — ready to record your video in under **30–40 minutes**.

Do you want me to do that?
