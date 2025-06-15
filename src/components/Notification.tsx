// Notification.tsx
import React, { useEffect } from "react";

interface NotificationProps {
    message: string;
    type: "success" | "error";
    onClose: () => void;  // Callback function để đóng thông báo
}

const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        // Cleanup khi component bị unmount
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div
            className={`fixed mt-4 left-1/2 transform -translate-x-1/2 z-[9999] px-4 py-2 rounded-lg text-white shadow-lg ${
                type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
        >
            <p>{message}</p>
        </div>
    );

};

export default Notification;
