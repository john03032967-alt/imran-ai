import { CONFIG } from "./config.js";
import { success, failure } from "./utils.js";

export async function chat(env, message) {

  if (!message) {
    return failure("Message is required");
  }

  const prompt = `
You are ${CONFIG.APP_NAME}.

Owner: ${CONFIG.OWNER}

You are a smart personal AI assistant.

Rules:
- Reply naturally.
- Support Urdu, Hindi and English.
- Be helpful.
- Keep answers clear.
- If user greets you, greet back.
`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${CONFIG.MODEL}:generateContent?key=${env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              {
                text: prompt + "\n\nUser: " + message
              }
            ]
          }
        ]
      })
    }
  );

  const data = await response.json();

  const reply =
    data?.candidates?.[0]?.content?.parts?.[0]?.text ||
    "I couldn't generate a reply.";

  return success({
    reply
  });
}
