import Header from "../components/Header";
import Footer from "../components/Footer";
import CardProduct from "../components/CardProduct";
import {useNavigate} from "react-router-dom";
import useProduct from "../hooks/useProduct";
import useCategory from "../hooks/useCategory";
import {useState} from "react";
import {BookForm, BookFormDisplayName} from "../enums/BookForm";

const Product = () => {
    const navigate = useNavigate();
    const {products} = useProduct();
    const [form, setForm] = useState<BookForm>()
    const {categories} = useCategory();
    const handleProductClick = (id: string) => {
        navigate(`/productDetail/${id}`);
    };


    return (
        <>
            <Header/>
            <div className="w-full bg-gray-100">
                <div className="max-w-7xl mx-auto pt-4 pb-10">
                    <div className="container mx-auto p-4">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <div className="col-span-1 bg-white p-6 rounded-lg shadow-md">
                                <h2 className="text-xl font-semibold mb-4">Lọc sản phẩm</h2>
                                <div className="mb-6">
                                    <h3 className="font-medium text-lg mb-2">Danh mục sản phẩm</h3>
                                    <select id="category" className="w-full p-2 border border-gray-300 rounded-md">
                                        <option value="">Chọn danh mục</option>
                                        {categories.map((categories) => (
                                            <option key={categories.id} value={categories.id}>{categories.name}</option>
                                        ))}
                                    </select>

                                </div>

                                <div className="mb-6">
                                    <h3 className="font-medium text-lg mb-2">Hình thức</h3>
                                    <select
                                        id="form"
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        value={form ?? ""}
                                        onChange={(e) => setForm(e.target.value as BookForm)}
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
                                        <label htmlFor="priceRangeSelect" className="text-sm mb-2">Chọn dải giá</label>
                                        <select
                                            id="priceRangeSelect"
                                            className="px-4 py-2 border border-gray-300 rounded-md"
                                        >
                                            <option value="0-1000">0 - 100.000 VNĐ</option>
                                            <option value="1000-2000">100.000 - 300.000 VNĐ</option>
                                            <option value="2000-5000">300.000 - 600.000 VNĐ</option>
                                            <option value="5000-10000">600.000 - 10.000.000 VNĐ</option>
                                            <option value="10000-20000"> Lớn hơn 1.000.000 VNĐ</option>
                                        </select>
                                    </div>
                                </div>
                                <button
                                    className="w-full bg-red-600 text-white p-2 rounded-md hover:bg-blue-700 mt-4">Lọc
                                    sản phẩm
                                </button>
                            </div>

                            <div className="col-span-3">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )

}
export default Product;