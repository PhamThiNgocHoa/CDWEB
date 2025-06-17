import React, {useState} from "react";
import {Discount} from "../../../../models/Discount";

type Props = {
    coupons: Discount[];
    onDelete: (code: string) => void;
    onUpdate: (coupon: Discount) => void;
};

function CouponList({coupons, onDelete, onUpdate}: Props) {
    const [editId, setEditId] = useState<string | null>(null);
    const [editCode, setEditCode] = useState("");
    const [editDiscount, setEditDiscount] = useState(0);
    const [editStartDate, setEditStartDate] = useState("");
    const [editExpiryDate, setEditExpiryDate] = useState("");

    const startEditing = (coupon: Discount) => {
        setEditId(coupon.id);
        setEditCode(coupon.code ?? "");
        setEditDiscount(coupon.percent);
        setEditStartDate(coupon.startDate ?? "");
        setEditExpiryDate(coupon.endDate ?? "");
    };

    const cancelEdit = () => setEditId(null);

    const saveEdit = () => {
        if (editId == null) return;
        const updated: Discount = {
            id: editId,
            code: editCode,
            percent: editDiscount,
            startDate: editStartDate,
            endDate: editExpiryDate,
        };
        onUpdate(updated);
        setEditId(null);
    };

    return (
        <div className="bg-white rounded shadow p-4 overflow-x-auto">
            <h2 className="text-lg font-semibold mb-4">Danh sách mã giảm giá</h2>
            <table className="min-w-full table-auto border-collapse border border-gray-300">
                <thead>
                <tr className="bg-gray-200">
                    <th className="border border-gray-300 p-2">Mã</th>
                    <th className="border border-gray-300 p-2">Giảm (%)</th>
                    <th className="border border-gray-300 p-2">Ngày bắt đầu</th>
                    <th className="border border-gray-300 p-2">Hạn dùng</th>
                    <th className="border border-gray-300 p-2">Thao tác</th>
                </tr>
                </thead>
                <tbody>
                {coupons.length === 0 && (
                    <tr>
                        <td colSpan={6} className="text-center p-4 text-gray-500">
                            Chưa có mã giảm giá nào
                        </td>
                    </tr>
                )}
                {coupons.map((coupon) => (
                    <tr key={coupon.id} className="border-t border-gray-300">
                        <td className="border border-gray-300 p-2 text-center">
                            {editId === coupon.id ? (
                                <input
                                    type="text"
                                    value={editCode}
                                    onChange={(e) => setEditCode(e.target.value.toUpperCase())}
                                    className="border p-1 rounded w-full"
                                    readOnly
                                />
                            ) : (
                                coupon.code
                            )}
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                            {editId === coupon.id ? (
                                <input
                                    type="number"
                                    value={editDiscount}
                                    onChange={(e) => setEditDiscount(Number(e.target.value))}
                                    className="border p-1 rounded w-full"
                                    min={1}
                                    max={100}
                                />
                            ) : (
                                coupon.percent
                            )}
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                            {editId === coupon.id ? (
                                <input
                                    type="date"
                                    value={editStartDate}
                                    onChange={(e) => setEditStartDate(e.target.value)}
                                    className="border p-1 rounded w-full"
                                />
                            ) : (
                                coupon.startDate
                            )}
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                            {editId === coupon.id ? (
                                <input
                                    type="date"
                                    value={editExpiryDate}
                                    onChange={(e) => setEditExpiryDate(e.target.value)}
                                    className="border p-1 rounded w-full"
                                />
                            ) : (
                                coupon.endDate
                            )}
                        </td>
                        <td className="border border-gray-300 p-2 text-center space-x-2">
                            {editId === coupon.id ? (
                                <>
                                    <button
                                        onClick={saveEdit}
                                        className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                                    >
                                        Lưu
                                    </button>
                                    <button
                                        onClick={cancelEdit}
                                        className="bg-gray-400 text-white px-2 py-1 rounded hover:bg-gray-500"
                                    >
                                        Hủy
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={() => startEditing(coupon)}
                                        className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                                    >
                                        Sửa
                                    </button>
                                    <button
                                        onClick={() => onDelete(coupon.code!)}
                                        className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                                    >
                                        Xóa
                                    </button>
                                </>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default CouponList;
