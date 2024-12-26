import React, { useState } from 'react';
import EditForm from './EditForm/EditForm';
import Notification from './Notification/Notification';

const Contact = ({ contacts, onAddContact, onUpdateContact, onDeleteContact, editingContact, setEditingContact }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });
    const [showNotification, setShowNotification] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.firstName && formData.lastName && formData.email) {
            const fullName = `${formData.firstName.toLowerCase()} ${formData.lastName.toLowerCase()}`;
            const isDuplicate = contacts.some(contact => 
                `${contact.firstName.toLowerCase()} ${contact.lastName.toLowerCase()}` === fullName
            );

            if (isDuplicate) {
                setShowNotification(true);
            } else {
                onAddContact(formData);
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: ''
                });
            }
        }
    };

    return (
        <div className="container mx-auto p-4">
            {showNotification && (
                <Notification 
                    message="Contact already exists."
                    onClose={() => setShowNotification(false)}
                />
            )}
            <div className="mb-8">
                <h1 className="text-2xl font-bold mb-4">My Contacts</h1>
                <form onSubmit={handleSubmit} className="mb-6">
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                placeholder="First Name"
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                placeholder="Last Name"
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                placeholder="Email"
                                required
                            />
                        </div>
                    </div>
                    <div className="mt-3">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Add Contact
                        </button>
                        <button
                            type="button"
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2"
                            onClick={() => setFormData({ firstName: '', lastName: '', email: '' })}
                        >
                            Clear
                        </button>
                    </div>
                </form>
            </div>

            <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">Contact List</h3>
                <div className="space-y-4">
                    {contacts.map(contact => (
                        <div key={contact.id}>
                            <div className="flex justify-between items-center p-4 border rounded">
                                <div>
                                    <p className="font-semibold">
                                        {contact.firstName} {contact.lastName}
                                    </p>
                                    <p className="text-gray-600">{contact.email}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setEditingContact(contact)}
                                        className="p-2 text-gray-600 hover:text-blue-600"
                                    >
                                        <span className="material-icons">edit</span>
                                    </button>
                                    <button
                                        onClick={() => onDeleteContact(contact.id)}
                                        className="p-2 text-gray-600 hover:text-red-600"
                                    >
                                        <span className="material-icons">delete</span>
                                    </button>
                                </div>
                            </div>
                            {editingContact?.id === contact.id && (
                                <EditForm
                                    contact={contact}
                                    onUpdate={onUpdateContact}
                                    onCancel={() => setEditingContact(null)}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Contact;
