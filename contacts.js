const contacts = [];

export function addContact(name, phone) {

  contacts.push({
    id: crypto.randomUUID(),
    name,
    phone,
    createdAt: new Date().toISOString()
  });

  return {
    success: true
  };
}

export function getContacts() {
  return contacts;
}

export function findContact(name) {

  return contacts.find(contact =>
    contact.name.toLowerCase() ===
    name.toLowerCase()
  );

}

export function deleteContact(id) {

  const index = contacts.findIndex(
    contact => contact.id === id
  );

  if (index !== -1) {
    contacts.splice(index, 1);
  }

  return {
    success: true
  };
}
