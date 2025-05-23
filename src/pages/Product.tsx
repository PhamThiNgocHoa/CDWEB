import Header from "../components/Header";
import Footer from "../components/Footer";
import CardProduct from "../components/CardProduct";
import {useNavigate} from "react-router-dom";

const Product = () => {
    const navigate = useNavigate();
    const handleProductClick = (id: number) => {
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
                                        <option value="1">Điện thoại</option>
                                        <option value="2">Laptop</option>
                                        <option value="3">Tai nghe</option>
                                    </select>
                                </div>

                                <div className="mb-6">
                                    <h3 className="font-medium text-lg mb-2">Ngôn ngữ</h3>
                                    <select id="language" className="w-full p-2 border border-gray-300 rounded-md">
                                        <option value="">Chọn ngôn ngữ</option>
                                        <option value="vi">Tiếng Việt</option>
                                        <option value="en">Tiếng Anh</option>
                                        <option value="ja">Tiếng Nhật</option>
                                    </select>
                                </div>

                                <div className="mb-6">
                                    <h3 className="font-medium text-lg mb-2">Hình thức</h3>
                                    <select id="form" className="w-full p-2 border border-gray-300 rounded-md">
                                        <option value="">Chọn hình thức</option>
                                        <option value="new">Mới</option>
                                        <option value="used">Cũ</option>
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
                                            <option value="0-1000">0 - 1000 VNĐ</option>
                                            <option value="1000-2000">1000 - 2000 VNĐ</option>
                                            <option value="2000-5000">2000 - 5000 VNĐ</option>
                                            <option value="5000-10000">5000 - 10000 VNĐ</option>
                                            <option value="10000-20000">10000 - 20000 VNĐ</option>
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
                                    <CardProduct id={"1"} name={"KKKKK"} img={"FFFF"} price={100} quantitySold={5}
                                                 onClick={() => handleProductClick(1)}/>
                                    <CardProduct id={"1"} name={"KKKKK"} img={"FFFF"} price={100} quantitySold={5}
                                                 onClick={() => handleProductClick(1)}/>

                                    <CardProduct id={"1"} name={"KKKKK"} img={"FFFF"} price={100} quantitySold={5}
                                                 onClick={() => handleProductClick(1)}/>

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