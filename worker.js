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

  const memory = new Memory(env);

  return successResponse({
    memory: await memory.all("default")
  });

}
   // Clear Memory
if (path === "/clear-memory") {

  const memory = new Memory(env);

  await memory.clear("default");

  return successResponse({
    message: "Memory cleared successfully."
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

      const memory = new Memory(env);

await memory.add("default", "user", body.message);

const brain = new Brain(env);
const history = await memory.all("default");

const reply = await brain.chat(body.message, history);

await memory.add("default", "assistant", reply);

return successResponse({
  reply,
  success: true,
  history: await memory.all("default")
});
    }

    return errorResponse("Route not found.", 404);

  }
}; 
