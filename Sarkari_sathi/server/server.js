const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '512kb' }));

const PORT = process.env.PORT || 3000;

// Read API key from environment variable (do NOT hardcode in client)
const API_KEY = process.env.GEMINI_API_KEY || process.env.GEMINI_KEY;
if (!API_KEY) {
  console.warn('Warning: GEMINI_API_KEY not set. Smart proxy will fail until you set it.');
}

// Helper: build constrained prompt using provided context snippets
function buildPrompt(userMessage, contextArray) {
  const header = `You are Sarkari Sathi, a helpful assistant for Nepali government document guidance. Use ONLY the provided dataset context to answer the user's question. If the exact answer is not present in the context, respond with "I don't know from the local data" and then give safe next steps the user can take (which offices to contact or what documents to prepare). Keep answers step-by-step and concise.`;

  let ctxText = '';
  if (Array.isArray(contextArray)) {
    for (const item of contextArray) {
      try {
        const small = typeof item.content === 'string' ? item.content : JSON.stringify(item.content);
        ctxText += `\n--- ${item.key} ---\n${small.slice(0, 4000)}`; // trim very long items
      } catch (e) {
        // skip
      }
    }
  }

  const prompt = `${header}\n\nContext:${ctxText}\n\nUser question: ${userMessage}\n\nAnswer using only the Context.`;
  return prompt;
}

// Route: generate a reply using the Generative API (text-bison)
app.post('/api/generate', async (req, res) => {
  const { message, context } = req.body || {};
  if (!message) return res.status(400).json({ error: 'message required' });

  const prompt = buildPrompt(message, context || []);

  if (!API_KEY) return res.status(500).json({ error: 'Server missing GEMINI_API_KEY environment variable' });

  try {
    // Using Google's Generative Language REST endpoint for text-bison (adjust if needed)
    const endpoint = `https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generate?key=${API_KEY}`;
    const body = { prompt: { text: prompt }, temperature: 0.0, maxOutputTokens: 800 };

    const r = await axios.post(endpoint, body, { timeout: 20000 });
    // expected response: { candidates: [{ output: '...' }] } or { ... candidates ... }
    let output = null;
    if (r.data) {
      // handle a few possible response shapes
      if (r.data.candidates && r.data.candidates[0] && r.data.candidates[0].output) output = r.data.candidates[0].output;
      if (!output && r.data.candidates && r.data.candidates[0] && r.data.candidates[0].content) output = r.data.candidates[0].content;
      if (!output && r.data.output) output = r.data.output;
    }

    if (!output && r.data && typeof r.data === 'object') output = JSON.stringify(r.data).slice(0, 2000);

    return res.json({ output: output || 'No reply from model.' });
  } catch (err) {
    console.error('Generative API error:', err.toString());
    const status = err.response && err.response.status ? err.response.status : 500;
    const data = err.response && err.response.data ? err.response.data : { message: err.message };
    return res.status(status).json({ error: 'Model call failed', details: data });
  }
});

app.listen(PORT, () => console.log(`Smart-proxy listening on http://localhost:${PORT}`));
