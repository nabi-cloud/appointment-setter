import React, { useState } from 'react';

const EditForm = ({ contact, onUpdate, onCancel }) => {
    const [formData, setFormData] = useState({
        firstName: contact.firstName,
        lastName: contact.lastName,
        email: contact.email
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
        if (formData.firstName && formData.lastName && formData.email) {
            onUpdate({ ...formData, id: contact.id });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-2 p-4 bg-gray-50 rounded">
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
            <div className="mt-3 flex gap-2">
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Update
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default EditForm;
