import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

const contactsPath = path.resolve('./db/contacts.json');

function listContacts() {
    fs.readFile(contactsPath, 'utf-8', (err, data) => {
        if (err) throw err;
        console.log(Object.values(JSON.parse(data)));
    });
};


function getContactById(contactId) {
    fs.readFile(contactsPath, 'utf-8', (err, data) => {
        if (err) throw err;

        data = Object.values(JSON.parse(data)).filter(obj => obj.id === contactId.toString());
        console.log(data);
    });
};


function removeContact(contactId) {
    fs.readFile(contactsPath, 'utf-8', (err, data) => {
        if (err) throw err;
        if (Object.values(JSON.parse(data)).some(element => element.id === contactId.toString())){
            const newData = Object.values(JSON.parse(data)).filter(obj => obj.id !== contactId.toString());
            fs.writeFile(contactsPath, JSON.stringify(newData), (err) => {
                if (err) throw err;
                console.log(newData);
                });
        } else return console.warn(`The user with id ${contactId} is not exist!`);
        });
};


function addContact(name, email, phone) {
    const newContact = {
        'id': uuidv4(),
        'name': name,
        'email': email,
        'phone': phone
    }

    fs.readFile(contactsPath, 'utf-8', (err, data) => {
        if (err) throw err;
        if (Object.values(JSON.parse(data)).some(element => element.name === name))
            return console.warn(`The user ${name} is exist already!`);

        const newData = [...Object.values(JSON.parse(data)), newContact];
        fs.writeFile(contactsPath, JSON.stringify(newData), (err) => {
            if (err) throw err;
            console.log(newData);
        });
    });
};


export { listContacts, getContactById, removeContact, addContact };
