const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');

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



function getContactById(contactId) {
    // ...твой код
}

function removeContact(contactId) {
    // ...твой код
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

// function listContacts() {
//     fs.readFile(contactsPath, 'utf8', (error, data) => {
//         if (error) {
//             console.log(error)
//         }
//         console.log(data)
//     })
// }

// const contactsPath = path.resolve('db', 'contacts.json');
// console.log(contactsPath);