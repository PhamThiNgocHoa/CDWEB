import React, { useState } from "react";
import { filterProduct } from "../server/api/product/product.get";
import { BookForm } from "../enums/BookForm";

interface ProductResponse {
    id: string;
    name: string;
    price: number;
    // các trường khác nếu cần
}

const TestProductPage = () => {
    const [products, setProducts] = useState<ProductResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [name, setName] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [bookForm, setBookForm] = useState<BookForm | "">("");
    const [minPrice, setMinPrice] = useState<number | "">("");
    const [maxPrice, setMaxPrice] = useState<number | "">("");

    const handleSearch = async () => {
        setLoading(true);
        setError(null);

        try {
            const result = await filterProduct(
                name || undefined,
                categoryId || undefined,
                bookForm || undefined,
                minPrice === "" ? undefined : Number(minPrice),
                maxPrice === "" ? undefined : Number(maxPrice)
            );

            // Chuẩn hóa giá về number để hiển thị chuẩn
            const normalized = result.map((p) => ({
                ...p,
                price: Number(p.price),
            }));

            setProducts(normalized);
        } catch (err: any) {
            setError(err.message || "Đã có lỗi xảy ra");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>Trang test API sản phẩm</h2>

            <div style={{ marginBottom: 10 }}>
                <label>
                    Tên sản phẩm:{" "}
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nhập tên sản phẩm"
                    />
                </label>
            </div>

            <div style={{ marginBottom: 10 }}>
                <label>
                    Category ID:{" "}
                    <input
                        type="text"
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        placeholder="Nhập Category ID"
                    />
                </label>
            </div>

            <div style={{ marginBottom: 10 }}>
                <label>
                    Book Form:{" "}
                    <select
                        value={bookForm}
                        onChange={(e) => setBookForm(e.target.value as BookForm | "")}
                    >
                        <option value="">-- Chọn hình thức sách --</option>
                        <option value={BookForm.HARDCOVER}>HARDCOVER</option>
                        <option value={BookForm.PAPERBACK}>PAPERBACK</option>
                        {/* Thêm option nếu enum có nhiều loại */}
                    </select>
                </label>
            </div>

            <div style={{ marginBottom: 10 }}>
                <label>
                    Giá từ:{" "}
                    <input
                        type="number"
                        min={0}
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value === "" ? "" : Number(e.target.value))}
                        placeholder="Giá thấp nhất"
                    />
                </label>
            </div>

            <div style={{ marginBottom: 10 }}>
                <label>
                    Giá đến:{" "}
                    <input
                        type="number"
                        min={0}
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value === "" ? "" : Number(e.target.value))}
                        placeholder="Giá cao nhất"
                    />
                </label>
            </div>

            <button onClick={handleSearch} disabled={loading}>
                {loading ? "Đang tìm..." : "Tìm sản phẩm"}
            </button>

            {error && <p style={{ color: "red" }}>Lỗi: {error}</p>}

            <ul style={{ marginTop: 20 }}>
                {products.length === 0 && !loading && <li>Không có sản phẩm nào.</li>}
                {products.map((p) => (
                    <li key={p.id}>
                        {p.name} - Giá:{" "}
                        {p.price.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                        })}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TestProductPage;
