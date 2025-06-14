import React, {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CardProduct from "../components/CardProduct";
import useProduct from "../hooks/useProduct";
import {ProductResponse} from "../models/response/ProductResponse";
import useCategory from "../hooks/useCategory";
import {BookForm, BookFormDisplayName} from "../enums/BookForm";
import {getListProduct} from "../server/api/product/product.get";

const SearchProduct = () => {
    const {name} = useParams();
    // const [products, setProducts] = useState<ProductResponse[]>([]);
    const {products, setProducts} =useProduct();
    const [filteredProducts, setFilteredProducts] = useState<ProductResponse[]>([]);
    const [priceRange, setPriceRange] = useState<string>("");
    const {fetchListFindByName} = useProduct();
    const navigate = useNavigate();
    const {categories} = useCategory();
    const [categoryId, setCategoryId] = useState<string | undefined>();
    const [form, setForm] = useState<BookForm | undefined>();

    useEffect(() => {
        const search = async () => {
            if (name && name.trim() !== "") {
                const result = await fetchListFindByName(decodeURIComponent(name));
                setProducts(result);
                setFilteredProducts(result);
            } else {
                const all = await getListProduct();
                setProducts(all);
                setFilteredProducts([]);
            }
        };
        search();
    }, [name]);

    useEffect(() => {
        let filtered = [...products];

        if (categoryId) {
            filtered = filtered.filter((p) => p.categoryId === categoryId);
        }

        if (form) {
            filtered = filtered.filter((p) => p.form === form);
        }

        if (priceRange) {
            const [minStr, maxStr] = priceRange.split("-");
            const min = Number(minStr) * 1000;
            const max = Number(maxStr) * 1000;
            filtered = filtered.filter((p) => p.price >= min && p.price <= max);
        }

        setFilteredProducts(filtered);
    }, [priceRange, categoryId, form, products]);

    const handleProductClick = (id: string) => {
        navigate(`/productDetail/${id}`);
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value || undefined;
        setCategoryId(value);
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value as BookForm || undefined;
        setForm(value);
    };

    const handlePriceRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setPriceRange(value);
    };

    const clearFilters = () => {
        setCategoryId(undefined);
        setForm(undefined);
        setPriceRange("");
    };

    return (
        <>
            <Header/>
            <div className="w-full bg-gray-100">
                <div className="max-w-7xl mx-auto pt-4 pb-10">
                    <div className="container mx-auto p-4">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            {/* Bộ lọc */}
                            <div className="col-span-1 bg-white p-6 rounded-lg shadow-md">
                                <h2 className="text-xl font-semibold mb-4">Lọc sản phẩm</h2>

                                {/* Danh mục */}
                                <div className="mb-6">
                                    <h3 className="font-medium text-lg mb-2">Danh mục sản phẩm</h3>
                                    <select
                                        id="category"
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        value={categoryId ?? ""}
                                        onChange={handleCategoryChange}
                                    >
                                        <option value="">Chọn danh mục</option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Hình thức */}
                                <div className="mb-6">
                                    <h3 className="font-medium text-lg mb-2">Hình thức</h3>
                                    <select
                                        id="form"
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        value={form ?? ""}
                                        onChange={handleFormChange}
                                    >
                                        <option value="">Chọn hình thức</option>
                                        {Object.entries(BookFormDisplayName).map(([key, label]) => (
                                            <option key={key} value={key}>
                                                {label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mb-6">
                                    <h3 className="font-medium text-lg mb-2">Lọc theo giá</h3>
                                    <div className="flex flex-col mb-4">
                                        <label htmlFor="priceRangeSelect" className="text-sm mb-2">
                                            Chọn dải giá
                                        </label>
                                        <select
                                            id="priceRangeSelect"
                                            className="px-4 py-2 border border-gray-300 rounded-md"
                                            value={priceRange}
                                            onChange={handlePriceRangeChange}
                                        >
                                            <option value="">Tất cả</option>
                                            <option value="0-100">0 - 100.000 VNĐ</option>
                                            <option value="100-300">100.000 - 300.000 VNĐ</option>
                                            <option value="300-600">300.000 - 600.000 VNĐ</option>
                                            <option value="600-10000">600.000 - 10.000.000 VNĐ</option>
                                            <option value="10000-20000">Lớn hơn 10.000.000 VNĐ</option>
                                        </select>
                                    </div>
                                </div>

                                <button
                                    onClick={clearFilters}
                                    className="mt-4 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
                                >
                                    Xóa bộ lọc
                                </button>
                            </div>

                            <div className="col-span-3">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {filteredProducts.length > 0 ? (
                                        filteredProducts.map((product) => (
                                            <CardProduct
                                                key={product.id}
                                                id={product.id}
                                                name={product.name}
                                                img={product.img}
                                                price={product.price}
                                                discount={product.discount}
                                                quantitySold={10}
                                                onClick={() => handleProductClick(product.id)}
                                            />
                                        ))
                                    ) : (
                                        <p>Không tìm thấy sản phẩm phù hợp.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer/>
        </>
    );
};

export default SearchProduct;
