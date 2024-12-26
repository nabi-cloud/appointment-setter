import './App.css';
import { useState } from 'react';
import Contact from './Components/Contact';

function App() {
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);

  const addContact = (newContact) => {
    setContacts(prevContacts => [...prevContacts, { ...newContact, id: Date.now() }]);
  };

  const updateContact = (updatedContact) => {
    setContacts(prevContacts =>
      prevContacts.map(contact =>
        contact.id === updatedContact.id ? updatedContact : contact
      )
    );
    setEditingContact(null);
  };

  const deleteContact = (contactId) => {
    setContacts(prevContacts => prevContacts.filter(contact => contact.id !== contactId));
  };

  return (
    <div>
      <Contact
        contacts={contacts}
        onAddContact={addContact}
        onUpdateContact={updateContact}
        onDeleteContact={deleteContact}
        editingContact={editingContact}
        setEditingContact={setEditingContact}
      />
    </div>
  );
}

export default App;
