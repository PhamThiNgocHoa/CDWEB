import React, { useState } from "react";
import { Discount } from "../../../../models/Discount";

interface CouponFormProps {
    onAdd: (coupon: Omit<Discount, "id">) => void;
}

function CouponForm({ onAdd }: CouponFormProps) {
    const [code, setCode] = useState("");
    const [percent, setPercent] = useState<number>(0); // đổi từ discount thành percent
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!code.trim() || percent <= 0 || !endDate) {
            alert("Vui lòng nhập đầy đủ thông tin hợp lệ.");
            return;
        }

        const newCoupon: Omit<Discount, "id"> = {
            code: code.trim(),
            percent,
            startDate: startDate,
            endDate,
            active: true,
        };

        onAdd(newCoupon);
        setCode("");
        setPercent(0);
        setStartDate("");
        setEndDate("");
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6 p-4 bg-white rounded shadow">
            <h2 className="text-lg font-semibold mb-4">Thêm mã giảm giá mới</h2>
            <div className="flex flex-col md:flex-row gap-4 items-center">
                <input
                    type="text"
                    placeholder="Mã giảm giá"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    className="border p-2 rounded flex-grow"
                    required
                />
                <input
                    type="number"
                    placeholder="Phần trăm giảm"
                    value={percent}
                    onChange={(e) => setPercent(Number(e.target.value))}
                    className="border p-2 rounded w-32"
                    min={1}
                    max={100}
                    required
                />
                <input
                    type="date"
                    placeholder="Ngày bắt đầu"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="border p-2 rounded"
                />
                <input
                    type="date"
                    placeholder="Ngày kết thúc"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="border p-2 rounded"
                    required
                />
                <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    Thêm
                </button>
            </div>
        </form>
    );
}

export default CouponForm;
