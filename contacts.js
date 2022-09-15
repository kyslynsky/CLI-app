const { join } = require("path");
const fs = require("fs/promises");
const { v4 } = require("uuid");
const updateContacts = require("./updateContacts");
const { stringify } = require("querystring");

const contactsPath = join(__dirname, "db/contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find(({ id }) => contactId === id);

  if (!contact) return null;

  return contact;
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = { id: v4(), name, email, phone };
  contacts.push(newContact);

  updateContacts(contacts, contactsPath);
  return newContact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(({ id }) => contactId === id);
  if (index === -1) return null;

  const [deletedContact] = contacts.splice(index, 1);
  updateContacts(contacts, contactsPath);
  return deletedContact;
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
