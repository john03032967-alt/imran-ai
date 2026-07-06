import { CONFIG } from "./config.js";

export class Brain {
  constructor(env) {
    this.env = env;
    this.apiKey = env.GEMINI_API_KEY;
    this.model = CONFIG.MODEL;
  }

  async chat(message, history = []) {
    if (!this.apiKey) {
      throw new Error("GEMINI_API_KEY not found");
    }

    const systemPrompt = `
You are Imran AI.

Rules:
- Your creator is John.
- Never say you are Google Gemini.
- Reply naturally.
- Support Urdu, Hindi and English.
- Keep answers clear and helpful.
`;

    const contents = [
      {
        role: "user",
        parts: [
          {
            text: systemPrompt
          }
        ]
      }
    ];

    for (const item of history) {
      contents.push({
        role: item.role === "assistant" ? "model" : "user",
        parts: [
          {
            text: item.text
          }
        ]
      });
    }

    contents.push({
      role: "user",
      parts: [
        {
          text: message
        }
      ]
    });

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent?key=${this.apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error?.message ||
        "Gemini API Error"
      );
    }

    return (
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't generate a response."
    );
  }
}
