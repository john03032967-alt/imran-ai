import { CONFIG } from "./config.js";
import { Brain } from "./brain.js";
import { Memory } from "./memory.js";
import { Contacts } from "./contacts.js";
import {
  jsonResponse,
  errorResponse,
  successResponse,
  now
} from "./utils.js";

export default {
  async fetch(request, env) {

    const url = new URL(request.url);
    const path = url.pathname;

    if (request.method === "OPTIONS") {
      return jsonResponse({
        success: true
      });
    }

    // Home
    if (path === "/") {
  return successResponse({
    message: "NEW CODE WORKING"
  });
    }

    // Status
    if (path === "/status") {
      return successResponse({
        online: true,
        model: CONFIG.MODEL,
        time: now()
      });
    }

    // Memory
    if (path === "/memory") {
      return successResponse({
        memory: Memory.all()
      });
    }

    // Contacts
    if (path === "/contacts") {
      return successResponse({
        contacts: Contacts.getAll()
      });
    }
   // Chat
   if (path === "/chat") {
      const body = await request.json().catch(() => ({}));

      if (!body.message) {
        return errorResponse("Message is required.");
      }

      Memory.add("user", body.message);

      const ai = await Brain.chat(body.message, env);

      Memory.add("assistant", ai.reply);

      return successResponse({
        reply: ai.reply,
        success: ai.success,
        history: Memory.all()
      });
    }

    return errorResponse("Route not found.", 404);

  }
}; 
