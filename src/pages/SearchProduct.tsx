import React, {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CardProduct from "../components/CardProduct";
import useProduct from "../hooks/useProduct";
import {Product} from "../models/Product";

const SearchProduct = () => {
    const {name} = useParams(); // lấy name từ URL
    const [products, setProducts] = useState<Product[]>([]);
    const {fetchListFindByName} = useProduct(); // gọi API tìm kiếm
    const navigate = useNavigate();

    useEffect(() => {
        const search = async () => {
            if (name) {
                const result = await fetchListFindByName(decodeURIComponent(name));
                setProducts(result);
            }
        };
        search();
    }, [name]);

    const handleProductClick = (id: string) => {
        navigate(`/productDetail/${id}`);
    };

    return (
        <>
            <Header/>
            <div className="w-full bg-gray-100">
                <div className="max-w-7xl mx-auto pt-4 pb-10">
                    <div className="container mx-auto p-4">
                        <h2 className="text-md text-red-600 mb-4">
                            Kết quả tìm kiếm cho: "{name}"
                        </h2>
                        {products.length === 0 ? (
                            <p>Không tìm thấy sản phẩm nào.</p>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                {products.map((product) => (
                                    <CardProduct
                                        key={product.id}
                                        id={product.id}
                                        name={product.name}
                                        img={product.img}
                                        price={product.price}
                                        quantitySold={10}
                                        onClick={() => handleProductClick(product.id)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default SearchProduct;
