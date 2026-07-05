export class Brain {
  constructor(env) {
    this.env = env;
    this.apiKey = env.GEMINI_API_KEY;
    this.model = "gemini-2.0-flash";
  }

  async chat(message, history = []) {
    if (!this.apiKey) {
      throw new Error("GEMINI_API_KEY not found");
    }

    const contents = [
      ...history,
      {
        role: "user",
        parts: [
          {
            text: message
          }
        ]
      }
    ];

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

    if (!response.ok) {
      throw new Error("Gemini API Error");
    }

    const data = await response.json();

    return (
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't generate a response."
    );
  }
}
