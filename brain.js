export const Brain = {
  async chat(message, env) {
    if (!env.GEMINI_API_KEY) {
      return {
        success: false,
        reply: "Gemini API Key not found."
      };
    }

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${env.GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: message
                  }
                ]
              }
            ]
          })
        }
      );

      const data = await response.json();

      return {
        success: true,
        reply:
          data?.candidates?.[0]?.content?.parts?.[0]?.text ||
          "No response from Gemini."
      };
    } catch (error) {
      return {
        success: false,
        reply: error.message
      };
    }
  }
};
