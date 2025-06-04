import React, { useEffect, useState } from "react";
import { FilterType } from "../model/FilterType";
import { ProductResponse } from "../../../../models/response/ProductResponse";
import { BookForm } from "../../../../enums/BookForm";
import EditProductModal from "./EditProductModal";

interface ProductTableProps {
    filters: FilterType;
}

const mockProducts: ProductResponse[] = [
    {
        id: "1",
        name: "Sản phẩm A",
        img: "https://cdn1.fahasa.com/media/flashmagazine/images/page_images/muoi_phut_moi_ngay_thi_tham_voi_con___nhung_cau_chuyen_thai_giao_hay_nhat_the_gioi/2023_10_05_16_43_14_1-390x510.jpg",
        price: 100000,
        detail: "Chi tiết sản phẩm A rất hấp dẫn và độc đáo.",
        supplier: "Nhà cung cấp A",
        author: "Tác giả A",
        publishYear: 2020,
        publisher: "Nhà xuất bản A",
        language: "Tiếng Việt",
        weight: 500, // gram
        size: "20x15 cm",
        pageNumber: 300,
        form: BookForm.BOARD_BOOK, // giả sử enum BookForm có Hardcover
        categoryId: "cat1",
        categoryName: "Điện tử",
        discount: 10, // 10%
        stock: 5,
    },
    {
        id: "2",
        name: "Sản phẩm B",
        img: "https://cdn1.fahasa.com/media/flashmagazine/images/page_images/muoi_phut_moi_ngay_thi_tham_voi_con___nhung_cau_chuyen_thai_giao_hay_nhat_the_gioi/2023_10_05_16_43_14_1-390x510.jpg",
        price: 200000,
        detail: "Chi tiết sản phẩm B với chất lượng tuyệt vời.",
        supplier: "Nhà cung cấp B",
        author: "Tác giả B",
        publishYear: 2018,
        publisher: "Nhà xuất bản B",
        language: "Tiếng Anh",
        weight: 600,
        size: "22x16 cm",
        pageNumber: 350,
        form: BookForm.EBOOK,
        categoryId: "cat2",
        categoryName: "Gia dụng",
        discount: 15,
        stock: 20,
    },
    {
        id: "3",
        name: "Sản phẩm C",
        img: "https://cdn1.fahasa.com/media/flashmagazine/images/page_images/muoi_phut_moi_ngay_thi_tham_voi_con___nhung_cau_chuyen_thai_giao_hay_nhat_the_gioi/2023_10_05_16_43_14_1-390x510.jpg",
        price: 250000,
        detail: "Chi tiết sản phẩm C phù hợp với mọi nhu cầu.",
        supplier: "Nhà cung cấp C",
        author: "Tác giả C",
        publishYear: 2019,
        publisher: "Nhà xuất bản C",
        language: "Tiếng Việt",
        weight: 550,
        size: "21x14 cm",
        pageNumber: 320,
        form: BookForm.HARDCOVER,
        categoryId: "cat2",
        categoryName: "Gia dụng",
        discount: 0,
        stock: 30,
    },
];


function ProductTable({ filters }: ProductTableProps) {
    const [products, setProducts] = useState<ProductResponse[]>(mockProducts);
    const [filtered, setFiltered] = useState<ProductResponse[]>([]);
    const [searchText, setSearchText] = useState("");  // thêm state cho ô tìm kiếm

    const [showEditModal, setShowEditModal] = useState(false);
    const [productToEdit, setProductToEdit] = useState<ProductResponse | null>(null);

    useEffect(() => {
        let result = [...products];

        // Lọc theo filters category, price, stock như cũ
        if (filters.category) result = result.filter((p) => p.categoryId === filters.category);

        if (filters.price === "asc") result.sort((a, b) => a.price - b.price);
        else if (filters.price === "desc") result.sort((a, b) => b.price - a.price);

        if (filters.stock === "low") result = result.filter((p) => p.stock !== undefined && p.stock <= 10);
        else if (filters.stock === "high") result = result.filter((p) => p.stock !== undefined && p.stock > 10);

        // Lọc theo searchText - theo id hoặc tên, không phân biệt hoa thường
        if (searchText.trim() !== "") {
            const lowerSearch = searchText.toLowerCase();
            result = result.filter(
                (p) => p.id.toLowerCase().includes(lowerSearch) || p.name.toLowerCase().includes(lowerSearch)
            );
        }

        setFiltered(result);
    }, [filters, products, searchText]); // thêm searchText làm dependency

    const handleDelete = (id: string) => {
        if (window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
            setProducts((prev) => prev.filter((p) => p.id !== id));
        }
    };

    const handleEdit = (product: ProductResponse) => {
        setProductToEdit(product);
        setShowEditModal(true);
    };

    const handleSaveEdit = (updatedProduct: ProductResponse) => {
        setProducts(prev =>
            prev.map(p => (p.id === updatedProduct.id ? updatedProduct : p))
        );
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
                                <img src={product.img} alt={product.name} className="w-12 h-12 object-cover rounded" />
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
                                    onClick={() => handleDelete(product.id)}
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
