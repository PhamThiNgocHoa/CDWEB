import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumb = () => {
    const location = useLocation();

    // Tách url path thành các phần, bỏ phần đầu rỗng
    let pathnames = location.pathname.split("/").filter((x) => x);

    // Lọc bỏ phần là số (id) hoặc param (ví dụ chỉ giữ phần không phải số)
    pathnames = pathnames.filter(segment => !/^\d+$/.test(segment));

    return (
        <nav className="text-sm mb-4" aria-label="breadcrumb">
            <ol className="list-reset flex text-gray-600">
                <li>
                    <Link to="/" className="text-blue-600 hover:underline">
                        Trang chủ
                    </Link>
                </li>
                {pathnames.map((name, index) => {
                    const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
                    const displayName = name
                        .replace(/-/g, " ")
                        .replace(/\b\w/g, (char) => char.toUpperCase()); // Viết hoa chữ cái đầu

                    return (
                        <li key={routeTo} className="flex items-center">
                            <span className="mx-2"> &gt; </span>
                            {index === pathnames.length - 1 ? (
                                <span className="text-gray-900 font-semibold">{displayName}</span>
                            ) : (
                                <Link to={routeTo} className="text-blue-600 hover:underline">
                                    {displayName}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumb;
