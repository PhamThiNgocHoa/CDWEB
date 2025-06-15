import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const items = [
        { label: 'Quản trị', path: '/administration' },
        { label: 'Quản lý danh mục', path: '/manageCategories' },
        { label: 'Quản lý mã giảm giá', path: '/manageCoupons' },
        { label: 'Quản lý đơn hàng', path: '/manageOrders' },
        { label: 'Quản lý sản phẩm', path: '/manageProducts' },
        { label: 'Quản lý người dùng', path: '/manageUser' },
    ];

    return (
        <>
            <div className="md:hidden p-4">
                <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800">
                    <FontAwesomeIcon icon={faBars} size="1x" />
                </button>
            </div>

            <aside
                className={`
                    bg-white shadow-lg p-4 mt-7
                    fixed top-0 left-0 z-50 
                    transform transition-transform duration-300
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
                    md:translate-x-0 md:static md:w-64
                `}
            >
                <h2 className="text-xl font-bold mb-6">Quản trị</h2>
                <ul className="space-y-4">
                    {items.map((item, index) => (
                        <li
                            key={index}
                            className={`cursor-pointer p-2 rounded ${
                                location.pathname === item.path
                                    ? 'bg-red-600 text-white'
                                    : 'hover:text-red-600 text-black'
                            }`}
                        >
                            <Link to={item.path} onClick={() => setIsOpen(false)}>{item.label}</Link>
                        </li>
                    ))}
                </ul>
            </aside>

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-40 z-40 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
}

export default Sidebar;
