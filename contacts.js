const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');
const { constants } = require('buffer');
const { resourceLimits } = require('worker_threads');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

const readContacts = async () => {
    try {
        const result = await fs.readFile(contactsPath, 'utf8')
        const contacts = JSON.parse(result);
        return contacts;
    } catch (error) {
        console.error(error);
    }
}

async function listContacts() {
 return readContacts();
};

async function getContactById(contactId) {
    try {
        const contacts = await readContacts()
        const [result] = contacts.filter((contact) => 
        contact.id === Number(contactId))
        return result;
    } catch (error) {
        console.error(error);
    }
}

async function removeContact(contactId) {
    try {
        const contacts = await readContacts();
        const newList = contacts.filter(contact => 
            contact.id !== Number(contactId))
        await fs.writeFile(contactsPath, JSON.stringify(newList), 'utf8');
        return newList;
    } catch (error) {
        console.error(error); 
    }
}

async function addContact(name, email, phone ) {
    try {
        const contacts = await readContacts();
        const newContact = {
            id: crypto.randomUUID(),
            name,
            email,
            phone,
        }
        contacts.push(newContact);
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), );
        return newContact;
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}
