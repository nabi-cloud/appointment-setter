import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Contact from './Components/Contact/Contact';
import Appointment from './Components/Appointment/Appointment';

function App() {
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);
  const [appointments, setAppointments] = useState([]);

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

  const addAppointment = (newAppointment) => {
    const contact = contacts.find(contact => String(contact.id) === String(newAppointment.contact));
    const contactName = contact ? `${contact.firstName} ${contact.lastName}` : 'Unknown';
    console.log('New Appointment Contact ID:', newAppointment.contact);
    console.log('Resolved Contact:', contact);
    console.log('Contact Name:', contactName);
    setAppointments(prevAppointments => [...prevAppointments, { ...newAppointment, id: Date.now(), contactName }]);
  };

  const deleteAppointment = (appointmentId) => {
    setAppointments(prevAppointments => prevAppointments.filter(appointment => appointment.id !== appointmentId));
  };

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Contact</Link></li>
            <li><Link to="/appointment">Appointment</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Contact
            contacts={contacts}
            onAddContact={addContact}
            onUpdateContact={updateContact}
            onDeleteContact={deleteContact}
            editingContact={editingContact}
            setEditingContact={setEditingContact}
          />} />
          <Route path="/appointment" element={<Appointment
            contacts={contacts}
            appointments={appointments}
            onAddAppointment={addAppointment}
            onDeleteAppointment={deleteAppointment}
          />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
