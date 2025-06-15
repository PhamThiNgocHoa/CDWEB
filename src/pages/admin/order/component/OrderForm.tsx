import React, { useEffect, useState } from "react";
import { OrderResponse } from "../../../../models/response/OrderResponse";
import { OrderStatus, OrderStatusDisplayName } from "../../../../enums/OrderStatus";
import {OrderEditReques} from "../../../../models/request/OrderEditReques";

interface OrderFormProps {
    onSave: (data: OrderEditReques, id: string) => Promise<void>;
    editingOrder: OrderResponse | null;
    onCancel: () => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ onSave, editingOrder, onCancel }) => {
    const [receiver, setReceiver] = useState("");
    const [status, setStatus] = useState<OrderStatus>(OrderStatus.PENDING);
    const [numberPhone, setNumberPhone] = useState("");
    const [address, setAddress] = useState("");

    useEffect(() => {
        if (editingOrder) {
            setReceiver(editingOrder.receiver);
            setStatus(editingOrder.status);
            setNumberPhone(editingOrder.numberPhone);
            setAddress(editingOrder.address);
        }
    }, [editingOrder]);

    if (!editingOrder) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!receiver) {
            alert("Vui lòng nhập đầy đủ thông tin hợp lệ.");
            return;
        }

        if (editingOrder?.id) {
            await onSave({
                receiver,
                address,
                status,
                numberPhone
            }, editingOrder.id);

            onCancel();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg relative"
            >
                <h2 className="text-xl font-semibold mb-4 text-center">Sửa đơn hàng</h2>
                <div className="flex flex-col space-y-3">
                    <input
                        type="text"
                        placeholder="Tên khách hàng"
                        value={receiver}
                        onChange={e => setReceiver(e.target.value)}
                        className="border p-2 rounded"
                    />
                    <input
                        type="number"
                        value={numberPhone}
                        onChange={e => setNumberPhone(e.target.value)}
                        className="border p-2 rounded"
                    />
                    <input
                        type="text"
                        placeholder="Địa chỉ"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        className="border p-2 rounded"
                    />
                    <select
                        value={status}
                        onChange={e => setStatus(e.target.value as OrderStatus)}
                        className="border p-2 rounded"
                    >
                        {Object.values(OrderStatus).map(key => (
                            <option key={key} value={key}>
                                {OrderStatusDisplayName[key]}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                    >
                        Hủy
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                        Cập nhật
                    </button>
                </div>
            </form>
        </div>
    );
};

export default OrderForm;
