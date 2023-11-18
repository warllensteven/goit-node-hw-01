const fs = require("fs");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

function listContacts() {
  const data = fs.readFileSync(contactsPath, "utf-8");
  return JSON.parse(data);
}

function getContactById(contactId) {
  const contacts = listContacts();
  return contacts.find((contact) => contact.id === contactId);
}

function removeContact(contactId) {
  const contacts = listContacts();
  const updatedContacts = contacts.filter(
    (contact) => contact.id !== contactId
  );
  saveContacts(updatedContacts);
}

function addContact(name, email, phone) {
  const contacts = listContacts();
  const newContact = { id: Date.now().toString(), name, email, phone };
  const updatedContacts = [...contacts, newContact];
  saveContacts(updatedContacts);
}

function saveContacts(contacts) {
  fs.writeFileSync(contactsPath, JSON.stringify(contacts, null, 2));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
