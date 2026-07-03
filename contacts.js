export const Contacts = {
  list: [],

  add(contact) {
    this.list.push(contact);
    return contact;
  },

  getAll() {
    return this.list;
  },

  find(name) {
    return this.list.find(
      c => c.name.toLowerCase() === name.toLowerCase()
    );
  },

  remove(name) {
    this.list = this.list.filter(
      c => c.name.toLowerCase() !== name.toLowerCase()
    );
    return true;
  }
};
