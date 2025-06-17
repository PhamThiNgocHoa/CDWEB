import React, { useEffect, useState } from 'react';
import { Category } from "../models/Category";
import { Product } from "../models/Product";
import useProduct from "../hooks/useProduct";
import { getListCategory } from "../server/api/category/category.get";
import { ProductResponse } from "../models/response/ProductResponse";
import ListCategory from "../components/ListCategory";

const ProductDetailView: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
    const { products } = useProduct();
    const [filteredProducts, setFilteredProducts] = useState<ProductResponse[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<ProductResponse | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            const data = await getListCategory();
            setCategories(data);
            if (data.length > 0) {
                setSelectedCategoryId(data[0].id ?? "");
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        if (!selectedCategoryId) return;

        const filtered = products.filter((p) => p.categoryId === selectedCategoryId);
        setFilteredProducts(filtered.slice(0, 10)); 
        setSelectedProduct(filtered[0] || null);
    }, [selectedCategoryId, products]);

    const handleCategoryClick = (id: string) => {
        setSelectedCategoryId(id);
    };

    const handleProductClick = (product: ProductResponse) => {
        setSelectedProduct(product);
    };

    return (
        <div className="p-4 min-h-screen bg-gray-50">
            {/* Danh mục */}
            <div className="mb-4 overflow-x-auto">
                <ListCategory
                    items={categories}
                    selectedId={selectedCategoryId}
                    onCategorySelect={handleCategoryClick}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Danh sách sản phẩm */}
                <div className="col-span-1 bg-white rounded-lg shadow p-4">
                    <h2 className="font-bold mb-3">Sản phẩm</h2>
                    <ul className="space-y-2">
                        {filteredProducts.map((product) => (
                            <li
                                key={product.id}
                                className={`cursor-pointer p-2 rounded-md ${
                                    selectedProduct?.id === product.id ? 'bg-red-100' : 'hover:bg-gray-100'
                                }`}
                                onClick={() => handleProductClick(product)}
                            >
                                <div className="flex items-center space-x-2">
                                    <img
                                        src={product.img || 'https://via.placeholder.com/60'}
                                        alt={product.name}
                                        className="w-12 h-12 object-cover rounded"
                                    />
                                    <span className="text-sm font-medium">{product.name}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Chi tiết sản phẩm */}
                <div className="col-span-2 bg-white rounded-lg shadow p-6">
                    {selectedProduct ? (
                        <>
                            <h2 className="text-2xl font-bold mb-2">{selectedProduct.name}</h2>
                            <img
                                src={selectedProduct.img || 'https://via.placeholder.com/400'}
                                alt={selectedProduct.name}
                                className="w-full h-64 object-contain mb-4"
                            />
                            <p className="mb-2">{selectedProduct.detail || 'Không có mô tả.'}</p>
                            <p className="text-lg font-semibold text-red-600">
                                Giá: {(selectedProduct.price * (1 - Number(selectedProduct.discount))).toLocaleString()} đ
                            </p>
                            {Number(selectedProduct.discount) > 0 && (
                                <p className="text-sm line-through text-gray-500">
                                    Giá gốc: {selectedProduct.price.toLocaleString()} đ
                                </p>
                            )}
                        </>
                    ) : (
                        <p>Không có sản phẩm nào được chọn.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetailView;
