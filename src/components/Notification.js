import React, { useEffect } from 'react';

const Notification = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-4 right-4 px-4 py-2 rounded-md text-white ${type === 'done' ? 'bg-green-600' : 'bg-yellow-400'
        }`}
    >
      {message}
    </div>
  );
};

export default Notification;
