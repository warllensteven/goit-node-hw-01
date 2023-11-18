const { Command } = require("commander");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require("./contacts");

const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contactsList = listContacts();
      console.log("Contacts list:", contactsList);
      break;

    case "get":
      const contact = getContactById(id);
      console.log("Contact by ID:", contact);
      break;

    case "add":
      addContact(name, email, phone);
      console.log("Contact added successfully");
      break;

    case "remove":
      removeContact(id);
      console.log("Contact removed successfully");
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
