let contacts = JSON.parse(localStorage.getItem('contacts')) || [];

function displayContacts() {
    const contactList = document.getElementById('contactList');
    contactList.innerHTML = '';
    contacts.forEach((contact, index) => {
        const contactEntry = document.createElement('div');
        contactEntry.innerHTML = `
            <table>
                <tr>
                    <td>${contact.fname} ${contact.lname}</td>
                    <td>Email: ${contact.email}</td>
                    <td>Phone: ${contact.phone}</td>
                    <td>
                        <button onclick="editContact(${index})">Edit</button>
                        <button onclick="deleteContact(${index})">Delete</button>
                    </td>
                </tr>
            </table>`;
        contactList.appendChild(contactEntry);
    });
}

function addContact(event) {
    event.preventDefault();
    const fname = document.getElementById('fname').value;
    const lname = document.getElementById('lname').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    if (fname && lname && email && phone) {
        contacts.push({ fname, lname, email, phone });
        localStorage.setItem('contacts', JSON.stringify(contacts));
        displayContacts();
        document.getElementById('contactForm').reset();
    }
}

function deleteContact(index) {
    contacts.splice(index, 1);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    displayContacts();
}

function editContact(index) {
    const contact = contacts[index];
    document.getElementById('fname').value = contact.fname;
    document.getElementById('lname').value = contact.lname;
    document.getElementById('email').value = contact.email;
    document.getElementById('phone').value = contact.phone;

    deleteContact(index); // Remove the contact from the list to avoid duplicates
}

document.addEventListener('DOMContentLoaded', displayContacts);
