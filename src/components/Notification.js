import React, { useEffect } from "react";

const Notification = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-4 right-4 px-2 md:px-4 text-xs md:text-md py-2 rounded-md z-20 text-white ${
        type === "done"
          ? "bg-green-600"
          : type === "dengues"
          ? "bg-red-700"
          : "bg-yellow-600"
      }`}
    >
      {message}
    </div>
  );
};

export default Notification;
