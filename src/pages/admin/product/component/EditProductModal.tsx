import React, { useState } from "react";
import { BookForm } from "../../../../enums/BookForm";
import { ProductResponse } from "../../../../models/response/ProductResponse";
import useCategory from "../../../../hooks/useCategory";
import {Product} from "../../../../models/Product";
import {uploadImage} from "../../../../server/api/imageUpload/image.post";

interface EditProductModalProps {
    product: ProductResponse;
    onClose: () => void;
    onSave: (id:string, updatedProduct: Product) => void;
}

function EditProductModal({ product, onClose, onSave }: EditProductModalProps) {
    const numberFields = ["price", "stock", "publishYear", "weight", "pageNumber", "discount"];
    const { categories } = useCategory();

    const [editForm, setEditForm] = useState<Product>({
        ...product,
        author: product.author || "",
        code: product.code || "",
        discount: product.discount?.toString() || "0",
        categoryId: product.categoryId || "",
    });




    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        if (name === "categoryName") {
            const selected = categories.find((cat) => cat.name === value);
            setEditForm((prev) => ({
                ...prev,
                categoryName: selected?.name || "",
                categoryId: selected?.id || "",
            }));
        } else {
            setEditForm((prev) => ({
                ...prev,
                [name]: numberFields.includes(name) ? Number(value) : value,
            }));
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            const imageUrl = await uploadImage(file);

            setEditForm((prev) => ({
                ...prev,
                img: imageUrl,
            }));
        } catch (error) {
            console.error("Lỗi upload ảnh:", error);
            alert("Tải ảnh lên thất bại. Vui lòng thử lại.");
        }
    };

    const fields = [
        { name: "name", label: "Tên sản phẩm", type: "text" },
        { name: "price", label: "Giá", type: "number" },
        { name: "detail", label: "Chi tiết", type: "textarea", colSpan: 3 },
        { name: "supplier", label: "Nhà cung cấp", type: "text" },
        { name: "author", label: "Tác giả", type: "text" },
        { name: "publishYear", label: "Năm xuất bản", type: "number" },
        { name: "publisher", label: "Nhà xuất bản", type: "text" },
        { name: "weight", label: "Trọng lượng (gram)", type: "number" },
        { name: "size", label: "Kích thước", type: "text" },
        { name: "pageNumber", label: "Số trang", type: "number" },
        { name: "code", label: "code", type: "text" },

        {
            name: "form",
            label: "Hình thức sách",
            type: "select",
            options: Object.entries(BookForm).map(([key, val]) => ({ key, val })),
        },
        {
            name: "categoryName",
            label: "Tên loại",
            type: "select",
            options: categories.map((cat) => ({ key: cat.name, val: cat.name })),
        },
        { name: "discount", label: "Giảm giá (%)", type: "number", min: 0, max: 1, step: 0.01 },
        { name: "stock", label: "Tồn kho", type: "number" },
    ];

    return (
        <div className="hidden xl:flex fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white p-6 rounded shadow w-[720px] max-h-[90vh] overflow-auto">
                <h2 className="text-xl font-semibold mb-6 text-center">Sửa sản phẩm</h2>
                <div className="flex justify-center mb-4">

                    <div className="flex flex-col items-center justify-start mr-4">
                        <img
                            src={editForm.img}
                            alt={editForm.name}
                            className="w-80 h-100 object-cover rounded shadow"
                        />
                        <div className="mt-2 w-full">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="block w-full text-sm text-gray-500"
                            />
                            <input
                                type="hidden"
                                value={editForm.img}
                                readOnly
                                className="mt-2 w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600"
                            />
                        </div>
                    </div>

                    {/* Các trường dữ liệu */}
                    <div className="grid grid-cols-4 gap-x-6 gap-y-4">
                        {fields.map(({ name, label, type, colSpan, options, min, max, step }) => (
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
                                        step={step}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={() => onSave(product.id, editForm)}
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
