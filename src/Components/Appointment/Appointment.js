import React, { useState } from 'react';
import './Appointment.css';

const Appointment = ({ contacts, appointments, onAddAppointment, onDeleteAppointment }) => {
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        time: '',
        contact: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.title && formData.date && formData.time && formData.contact) {
            const selectedContact = contacts.find(contact => String(contact.id) === String(formData.contact));
            const contactName = selectedContact ? `${selectedContact.firstName} ${selectedContact.lastName}` : 'Unknown';

            const appointmentData = {
                ...formData,
                contactName
            };

            onAddAppointment(appointmentData);
            setFormData({
                title: '',
                date: '',
                time: '',
                contact: ''
            });
        }
    };

    const handleDeleteAppointment = (appointmentId) => {
        onDeleteAppointment(appointmentId);
    };

    return (
        <div>
            <h1>My Appointments</h1>
            <form onSubmit={handleSubmit} className="appointment-form">
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Appointment Title"
                    required
                />
                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                />
                <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                />
                <select
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Contact</option>
                    {contacts.map(contact => (
                        <option key={contact.id} value={contact.id}>
                            {contact.firstName} {contact.lastName}
                        </option>
                    ))}
                </select>
                <button type="submit">Add Appointment</button>
            </form>
            <div className="appointment-list">
                {appointments.map(appointment => (
                    <div key={appointment.id} className="appointment-item">
                        <div>
                            <p>{appointment.title}</p>
                            <p>{appointment.date} at {appointment.time}</p>
                            <p>Contact: {appointment.contactName}</p>
                        </div>
                        <button
                            onClick={() => handleDeleteAppointment(appointment.id)}
                            className="delete-button"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Appointment;
