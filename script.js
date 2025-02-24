let contacts = JSON.parse(localStorage.getItem('contacts')) || [];

function displayContacts() {
    const contactTableBody = document.getElementById('contactTableBody');
    contactTableBody.innerHTML = '';
    contacts.forEach((contact, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${contact.fname}</td>
            <td>${contact.lname}</td>
            <td>${contact.email}</td>
            <td>${contact.phone}</td>
            <td>
                <button onclick="editContact(${index})">Edit</button>
                <button onclick="deleteContact(${index})">Delete</button>
            </td>`;
        contactTableBody.appendChild(row);
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

    deleteContact(index);
}

document.addEventListener('DOMContentLoaded', displayContacts);