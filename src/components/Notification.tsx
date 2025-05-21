// Notification.tsx
import React, { useEffect } from "react";

interface NotificationProps {
    message: string;
    type: "success" | "error";
    onClose: () => void;  // Callback function để đóng thông báo
}

const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
    useEffect(() => {
        // Tự động đóng thông báo sau 3 giây
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        // Cleanup khi component bị unmount
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div
            className={`fixed top-5 right-5 px-4 py-2 rounded-lg text-white ${
                type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
        >
            <p>{message}</p>
        </div>
    );
};

export default Notification;
