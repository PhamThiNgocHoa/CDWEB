import React, {useState, useEffect} from "react";
import {OrderRequest} from "../../../../models/request/OrderRequest";
import {OrderResponse} from "../../../../models/response/OrderResponse";
import {OrderFormData} from "../../../../models/request/OrderFormData";

interface OrderFormProps {
    onSave: (orderData: {
        totalAmount: number;
        receiver: string;
        numberPhone: string;
        address: string;
        orderDate: string;
        status: string
    }, id?: string | undefined) => void;
    editingOrder: OrderResponse | null;
    onCancel: () => void;
}


const OrderForm: React.FC<OrderFormProps> = ({onSave, editingOrder, onCancel}) => {
    const [receiver, setReceiver] = useState("");
    const [totalAmount, setTotalAmount] = useState(0);
    const [status, setStatus] = useState("Đang xử lý");
    const [orderDate, setOrderDate] = useState("");
    const [numberPhone, setNumberPhone] = useState("");
    const [address, setAddress] = useState("");



    useEffect(() => {
        if (editingOrder) {
            setReceiver(editingOrder.customerDTO.fullname);
            setTotalAmount(editingOrder.totalAmount);
            setStatus(editingOrder.status);
            setOrderDate(editingOrder.orderDate.slice(0, 10));
            setNumberPhone(editingOrder.numberPhone);
            setAddress(editingOrder.address);
        } else {
            setReceiver("");
            setTotalAmount(0);
            setStatus("Đang xử lý");
            setOrderDate("");
            setNumberPhone("");
            setAddress("");

        }
    }, [editingOrder]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!receiver || totalAmount <= 0 || !orderDate) {
            alert("Vui lòng nhập đầy đủ thông tin hợp lệ.");
            return;
        }
        onSave({receiver, totalAmount, status, orderDate, address, numberPhone}, editingOrder?.id);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
            <h2 className="text-lg font-semibold mb-4">{editingOrder ? "Sửa đơn hàng" : "Thêm đơn hàng mới"}</h2>
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
                    onChange={e => setNumberPhone((e.target.value))}
                    className="border p-2 rounded"
                />
                <input
                    type="number"
                    placeholder="Tổng tiền"
                    value={totalAmount}
                    onChange={e => setTotalAmount(Number(e.target.value))}
                    className="border p-2 rounded"
                    min={0}
                />
                <input
                    type="text"
                    value={address}
                    onChange={e => setAddress((e.target.value))}
                    className="border p-2 rounded"
                    min={0}
                />
                <select
                    value={status}
                    onChange={e => setStatus(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option>Đang xử lý</option>
                    <option>Hoàn thành</option>
                    <option>Hủy</option>
                </select>
                <input
                    type="date"
                    value={orderDate}
                    onChange={e => setOrderDate(e.target.value)}
                    className="border p-2 rounded"
                />
                <div className="flex space-x-3">
                    <button
                        type="submit"
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                        {editingOrder ? "Cập nhật" : "Thêm"}
                    </button>
                    {editingOrder && (
                        <button
                            type="button"
                            onClick={onCancel}
                            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                        >
                            Hủy
                        </button>
                    )}
                </div>
            </div>
        </form>
    );
};

export default OrderForm;
