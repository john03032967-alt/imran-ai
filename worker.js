import { CONFIG } from "./config.js";
import { jsonResponse } from "./utils.js";
import { Brain } from "./brain.js";
import { Memory } from "./memory.js";
import { Contacts } from "./contacts.js";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Home
    if (url.pathname === "/") {
      return jsonResponse({
        success: true,
        app: CONFIG.APP_NAME,
        version: CONFIG.VERSION,
        owner: CONFIG.OWNER,
        status: "online"
      });
    }

    // Status
    if (url.pathname === "/status") {
      return jsonResponse({
        success: true,
        status: "online",
        model: CONFIG.MODEL
      });
    }

    // Chat (placeholder)
    if (url.pathname === "/chat") {
      return jsonResponse({
        success: true,
        message: "Chat endpoint ready.",
        reply: "Assalamualaikum! Main Imran AI hoon."
      });
    }

    // Memory (placeholder)
    if (url.pathname === "/memory") {
      return jsonResponse({
        success: true,
        data: Memory
      });
    }

    // Contacts (placeholder)
    if (url.pathname === "/contacts") {
      return jsonResponse({
        success: true,
        data: Contacts
      });
    }

    return jsonResponse({
      success: false,
      error: "Route not found"
    }, 404);
  }
};
