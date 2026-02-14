# Codecraft Smart Proxy

This small Express proxy accepts chat requests from the frontend and forwards a context-constrained prompt to the Generative API (keeps the API key server-side).

Setup

1. Install dependencies

```bash
cd server
npm install
```

2. Create `.env` (or set env vars) with your API key

```
GEMINI_API_KEY=YOUR_GENERATIVE_API_KEY
PORT=3000
```

3. Start the proxy

```bash
npm start
```

By default the frontend will call `POST /api/generate` with JSON `{ message, context }`. The proxy responds `{ output }` where `output` is the model reply.

Security

- Keep `GEMINI_API_KEY` only on the server. Do not commit it.
