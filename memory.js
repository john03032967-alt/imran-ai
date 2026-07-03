export const Memory = {
  messages: [],

  add(role, text) {
    this.messages.push({
      role,
      text,
      time: new Date().toISOString()
    });
  },

  all() {
    return this.messages;
  },

  clear() {
    this.messages = [];
    return true;
  }
};
