import React, { useState } from "react";
import { BookForm } from "../../../../enums/BookForm";
import { ProductResponse } from "../../../../models/response/ProductResponse";

interface EditProductModalProps {
    product: ProductResponse;
    onClose: () => void;
    onSave: (updatedProduct: ProductResponse) => void;
}

const numberFields = ["price", "stock", "publishYear", "weight", "pageNumber", "discount"];

const fields = [
    { name: "name", label: "Tên sản phẩm", type: "text" },
    { name: "price", label: "Giá", type: "number" },
    { name: "detail", label: "Chi tiết", type: "textarea", colSpan: 3 },
    { name: "supplier", label: "Nhà cung cấp", type: "text" },
    { name: "author", label: "Tác giả", type: "text" },
    { name: "publishYear", label: "Năm xuất bản", type: "number" },
    { name: "publisher", label: "Nhà xuất bản", type: "text" },
    { name: "language", label: "Ngôn ngữ", type: "text" },
    { name: "weight", label: "Trọng lượng (gram)", type: "number" },
    { name: "size", label: "Kích thước", type: "text" },
    { name: "pageNumber", label: "Số trang", type: "number" },
    {
        name: "form",
        label: "Hình thức sách",
        type: "select",
        options: Object.entries(BookForm).map(([key, val]) => ({ key, val })),
    },
    { name: "categoryId", label: "Mã loại", type: "text" },
    { name: "categoryName", label: "Tên loại", type: "text" },
    { name: "discount", label: "Giảm giá (%)", type: "number", min: 0, max: 100 },
    { name: "stock", label: "Tồn kho", type: "number" },
];

function EditProductModal({ product, onClose, onSave }: EditProductModalProps) {
    const [editForm, setEditForm] = useState<ProductResponse>({ ...product });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setEditForm((prev) => ({
            ...prev,
            [name]: numberFields.includes(name) ? Number(value) : value,
        }));
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white p-6 rounded shadow w-[720px] max-h-[90vh] overflow-auto">
                <h2 className="text-xl font-semibold mb-6 text-center">Sửa sản phẩm</h2>

                <div className="grid grid-cols-3 gap-x-6 gap-y-4">
                    {fields.map(({ name, label, type, colSpan, options, min, max }) => (
                        <div key={name} className={colSpan === 3 ? "col-span-3" : ""}>
                            <label className="block mb-1 font-medium">{label}:</label>
                            {type === "textarea" ? (
                                <textarea
                                    name={name}
                                    value={(editForm as any)[name] ?? ""}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded px-3 py-2 resize-y"
                                    rows={3}
                                />
                            ) : type === "select" ? (
                                <select
                                    name={name}
                                    value={(editForm as any)[name]}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                >
                                    {options!.map(({ key, val }) => (
                                        <option key={key} value={val}>
                                            {key}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    type={type}
                                    name={name}
                                    value={(editForm as any)[name] ?? ""}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                    min={min}
                                    max={max}
                                />
                            )}
                        </div>
                    ))}
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={() => onSave(editForm)}
                        className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
                    >
                        Lưu
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditProductModal;
