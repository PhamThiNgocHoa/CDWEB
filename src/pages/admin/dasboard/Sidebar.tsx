import React from 'react';
import {Link, Route, useLocation} from 'react-router-dom';

function Sidebar() {
    const items = [
        {label: 'Quản trị', path: '/administration'},
        {label: 'Quản lý danh mục', path: '/manageCategories'},
        {label: 'Quản lý mã giảm giá', path: '/manageCoupons'},
        {label: 'Quản lý đơn hàng', path: '/manageOrders'},
        {label: 'Quản lý sản phẩm', path: '/manageProducts'},
        {label: 'Quản lý người dùng', path: '/manageUser'},

    ];
    const location = useLocation();

    return (
        <aside className="w-64 bg-white shadow-lg p-4">
            <h2 className="text-xl font-bold mb-6">Quản trị</h2>
            <ul className="space-y-4">
                {items.map((item, index) => (
                    <li
                        key={index}
                        className={`cursor-pointer p-2 rounded ${
                            location.pathname === item.path ? 'bg-red-600 text-white' : 'hover:text-red-600 text-black'
                        }`}
                    >
                        <Link to={item.path}>{item.label}</Link>
                    </li>
                ))}
            </ul>
        </aside>
    );
}

export default Sidebar;
