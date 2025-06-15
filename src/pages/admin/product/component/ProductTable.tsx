import React, {useEffect, useState} from "react";
import {FilterType} from "../model/FilterType";
import {ProductResponse} from "../../../../models/response/ProductResponse";
import EditProductModal from "./EditProductModal";
import {Product} from "../../../../models/Product";

interface ProductTableProps {
    products: ProductResponse[];
    filters: FilterType;
    onDeleteProduct: (productId: string) => Promise<void>;
    onUpdateProduct: (id: string, product: Product) => Promise<ProductResponse | null>;
    fetchAllProducts: () => Promise<void>; // 👈 thêm dòng này
}

function ProductTable({products, filters, onDeleteProduct, onUpdateProduct}: ProductTableProps) {

    const [filtered, setFiltered] = useState<ProductResponse[]>([]);
    const [searchText, setSearchText] = useState("");

    const [showEditModal, setShowEditModal] = useState(false);
    const [productToEdit, setProductToEdit] = useState<ProductResponse | null>(null);

    useEffect(() => {
        let result = [...products];

        if (filters.category) result = result.filter((p) => p.categoryId === filters.category);

        if (filters.price === "asc") result.sort((a, b) => a.price - b.price);
        else if (filters.price === "desc") result.sort((a, b) => b.price - a.price);

        if (filters.stock === "low") result = result.filter((p) => p.stock !== undefined && p.stock <= 10);
        else if (filters.stock === "high") result = result.filter((p) => p.stock !== undefined && p.stock > 10);

        if (filters.bookForm) {
            result = result.filter((p) => p.form === filters.bookForm);
        }

        if (searchText.trim() !== "") {
            const lowerSearch = searchText.toLowerCase();
            result = result.filter(
                (p) => p.id.toLowerCase().includes(lowerSearch) || p.name.toLowerCase().includes(lowerSearch)
            );
        }
        setFiltered(result);
    }, [filters, products, searchText]);

    const handleEdit = (product: ProductResponse) => {
        setProductToEdit(product);
        setShowEditModal(true);
    };

    const handleSaveEdit = async (id: string, updatedProduct: Product) => {
        await onUpdateProduct(id, updatedProduct);
        setShowEditModal(false);
    };


    const handleCloseModal = () => {
        setShowEditModal(false);
    };

    return (
        <>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Tìm kiếm theo ID hoặc tên sản phẩm..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="border p-2 rounded w-full max-w-md"
                />
            </div>

            <div className="bg-white shadow rounded overflow-x-auto">
                <table className="min-w-full text-left">
                    <thead>
                    <tr className="bg-gray-300 text-sm">
                        <th className="p-3">Hình ảnh</th>
                        <th className="p-3">Tên sản phẩm</th>
                        <th className="p-3">Giá</th>
                        <th className="p-3">Tồn kho</th>
                        <th className="p-3">Hành động</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filtered.map((product) => (
                        <tr key={product.id} className="border-t text-sm">
                            <td className="p-3">
                                <img src={product.img} alt={product.name} className="w-12 h-12 object-cover rounded"/>
                            </td>
                            <td className="p-3">{product.name}</td>
                            <td className="p-3">{product.price.toLocaleString()}₫</td>
                            <td className="p-3">{product.stock}</td>
                            <td className="p-3 space-x-2">
                                <button
                                    onClick={() => handleEdit(product)}
                                    className="bg-green-600 px-3 py-1 rounded text-white hover:bg-green-700"
                                >
                                    Sửa
                                </button>
                                <button
                                    onClick={() => onDeleteProduct(product.id)}
                                    className="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-600"
                                >
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                    {filtered.length === 0 && (
                        <tr>
                            <td colSpan={5} className="text-center text-gray-500 p-4">
                                Không tìm thấy sản phẩm phù hợp.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            {showEditModal && productToEdit && (
                <EditProductModal
                    product={productToEdit}
                    onClose={handleCloseModal}
                    onSave={handleSaveEdit}
                />
            )}
        </>
    );
}

export default ProductTable;
