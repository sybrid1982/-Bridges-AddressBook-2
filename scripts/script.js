'use strict';

class Contact {
    constructor (name, email, phone, relation) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.relation = relation;
    }
}

class AddressBook {
    constructor () {
        this.contacts = [];
    }
    addContact() {
        console.log('called');
        let inputs = document.querySelectorAll('input');
        let newContact = new Contact(inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].value);
        this.contacts.push(newContact);
        console.log(this.contacts[this.contacts.length-1]);
        console.log("contact added");
        this.display();
    }

    display() {
        // Code to draw the contacts part of the screen
        // Will start by clearing old display
        this.clear();
        if(this.contacts.length > 0) {
            let contactCols = document.querySelectorAll('.contCol')
            for(let i = 0; i < this.contacts.length; i++) {
                // We have three columns, so we could use modulo on i
                // to determine which column a contact should go in.
                let colNum = i % contactCols.length;
                let targetCol = contactCols[colNum];
                let newEl = document.createElement('section');
                let newHTML = `<ul>
                                    <li>Name: ${this.contacts[i].name}</li>
                                    <li>Email: ${this.contacts[i].email}</li>
                                    <li>Phone: ${this.contacts[i].phone}</li>
                                    <li>Relation: ${this.contacts[i].relation}</li>
                                </ul>
                                <button type='button' value='${i}'><i class="material-icons" value='${i}'>
                                delete
                                </i></button>`;
                newEl.innerHTML = newHTML;
                newEl.classList.add('item');
                targetCol.appendChild(newEl);
            }
            if(this.contacts.length < 3) {
                contactCols[2].style.display = 'none';
            } else {
                contactCols[2].style.display = 'flex';
            }
            if(this.contacts.length < 2) {
                contactCols[1].style.display = 'none';
            } else {
                contactCols[1].style.display = 'flex';
            }
        }
    }

    clear() {
        // Will clear the display
        // according to the internet, innerHTML = '' is less
        // performant than cycling through all the kids and
        // deleting them
        let columns = document.querySelectorAll('.contCol');
        console.dir(columns);
        for(let i = 0; i < columns.length; i++) {
            while(columns[i].children.length > 0) {
                columns[i].removeChild(columns[i].lastChild);
            }
        }
    }

    deleteAt(index) {
        // Check we aren't trying to delete an item with an index
        // out of range

        if(index && index >=0 && index < this.contacts.length) {
            // In range, so splice it out
            this.contacts.splice(index, 1);
            // Refresh to get rid of display of old contact
            this.display();
        }
    }
}

let addressBook = new AddressBook();

(() => {
    document.querySelector('form > button').addEventListener('click', () => { addressBook.addContact() });
    document.querySelector('.container').addEventListener('click', (e) => { 
        let target = e.target.value;
        if(e.target.tagName==="I"){
            target = e.target.parentNode.value;
        }
        addressBook.deleteAt(target) });
})();

addressBook.clear();