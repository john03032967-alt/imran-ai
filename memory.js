export class Memory {
  constructor(env) {
    this.kv = env.MEMORY;
  }

  async load(session = "default") {
    const data = await this.kv.get(session);

    if (!data) {
      return [];
    }

    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  async save(session, messages) {
    await this.kv.put(
      session,
      JSON.stringify(messages)
    );
  }

  async add(session, role, text) {
    const messages = await this.load(session);

    messages.push({
      role,
      text,
      time: new Date().toISOString()
    });

    await this.save(session, messages);

    return messages;
  }
  async all(session = "default") {
    return await this.load(session);
  }

  async clear(session = "default") {
    await this.kv.delete(session);
    return true;
  }
}
