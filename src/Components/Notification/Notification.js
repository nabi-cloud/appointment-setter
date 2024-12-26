import './Notification.css';

const Notification = ({ message, onClose }) => {
    return (
        <div className="notification-overlay">
            <div className="notification">
                <div className="text-center">
                    <p className="text-lg font-medium text-gray-800 mb-4">{message}</p>
                    <button
                        onClick={onClose}
                        className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200 shadow-sm"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Notification;
