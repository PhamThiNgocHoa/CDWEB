import React from "react";

const Sidebar = ({ onSelectSection }: { onSelectSection: (section: string) => void }) => (
    <aside className="w-1/4 bg-white p-6 shadow-md">
        <h2 className="text-lg font-semibold mb-4">Tài khoản của bạn</h2>
        <nav className="space-y-3">
            <button
                onClick={() => onSelectSection("info")}
                className="block w-full text-left px-4 py-2 hover:bg-gray-200 rounded"
            >
                Thông tin tài khoản
            </button>

        </nav>
    </aside>
);

export default Sidebar;
