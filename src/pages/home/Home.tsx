import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Header from "../../components/Header";
import Banner from "../../components/Banner";
import './style.css';
import Nav from "../../components/Nav";
import CategoryList from "../../components/user/CategoryList";
import Footer from "../../components/Footer";
import {checkTokenExpiration} from "../../server/api/authentication/auth.post"; // Import hàm kiểm tra token
import Error from "../../components/Error";
import CardProduct from "../../components/CardProduct";
import useCategory from "../../hooks/useCategory";
import ListCategory from "../../components/ListCategory";
import {Product} from "../../models/Product";
import useProduct from "../../hooks/useProduct"; // Import component Error popup

const mainImages = [
    '../image/TrangUuDaiT525_840x320.webp',
    '../image/muasamkhongtienmat_840x320T525.webp',
    '../image/thienlongT525_840x320.webp',
    '../image/DinhTiT525_840x320.webp',
];

const sideImages = [
    '../image/homecreditT5_392x156_5.webp',
    '../image/muasamkhongtienmat_840x320T525.webp',
];

const navItems = [
    {image: '../image/Icon_1505_120x120_1.webp', text: '15.05'},
    {image: '../image/Icon_DinhTi_120x120_1.webp', text: 'Đinh tị'},
    {image: '../image/Icon_DonSi_120x120.webp', text: 'Bán sỉ'},
    {image: '../image/Icon_MaGiamGia_8px_1.webp', text: 'Mã giảm giá'},
    {image: '../image/Icon_MCbook_120x120.webp', text: 'McBooks'},
    {image: '../image/Icon_SanPhamMoi_8px_1.webp', text: 'Sản phẩm mới'},
    {image: '../image/IconFlashSale120x120.webp', text: 'Flash Sale'},
    {image: '../image/icon_ManngaT06.webp', text: 'Mannga'},
    {image: '../image/ChoDoCu.webp', text: 'Phiên chợ đồ cũ'},
];

const Home = () => {
    const navigate = useNavigate();
    const [isErrorVisible, setIsErrorVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const token = localStorage.getItem("authToken");
    const {fetchGetListCategory, categories, setCategories} = useCategory();

    const handleProductClick = (id: number) => {
        navigate(`/productDetail/${id}`);
    };
    const {
        fetchGetListProduct,
        products,
        setProducts,
        fetchGetListProductSale,
        saleProducts,
        setSaleProducts
    } = useProduct();

    const [showAllProducts, setShowAllProducts] = useState(false);  // state mới để kiểm soát số lượng sản phẩm hiển thị

    useEffect(() => {
        const checkExpiration = async () => {
            if (token) {
                const f = await checkTokenExpiration(token);
            }
        };

        checkExpiration();
    }, [token, navigate]);

    useEffect(() => {
        const getListCategory = async () => {
            const categoryList = await fetchGetListCategory();
            setCategories(categoryList); // Cập nhật lại state với danh sách category
        }
        getListCategory();
    }, []);

    useEffect(() => {
        const getListProduct = async () => {
            const productList = await fetchGetListProduct();
            setProducts(productList);
        }
        getListProduct();
    }, []);

    useEffect(() => {
        const getListProductSale = async () => {
            const productList = await fetchGetListProductSale();
            setSaleProducts(productList);
        }
        getListProductSale();
    }, []);

    const closeError = () => {
        setIsErrorVisible(false);
        navigate("/login");
    };

    const toggleShowAllProducts = () => {
        setShowAllProducts(!showAllProducts);  // Thay đổi trạng thái khi nhấn nút "Xem thêm"
    };

    return (
        <>
            <Header/>
            <div className="bg-gray-100">
                <Banner mainImages={mainImages} sideImages={sideImages}/>
                <Nav items={navItems}/>
                <div className="w-full bg-red-400 mt-4 mb-4 pt-3 pb-3">
                    <div className=" sm:mx-10 md:mx-10 lg:mx-22 xl:mx-36 bg-white rounded-md p-5">
                        <img src="../image/label-flashsale.svg"/>
                    </div>
                    <div className="mt-4 sm:px-10 md:px-10 lg:px-22 xl:px-36">
                        <div className="flex overflow-x-auto whitespace-nowrap gap-5">
                            <div className="flex flex-row w-full gap-5 mb-4">
                                {saleProducts.map((product: Product) => (
                                    <CardProduct
                                        key={product.id}
                                        id={product.id}
                                        name={product.name}
                                        img={product.img}
                                        price={product.price}
                                        discount={product.discount}
                                        quantitySold={1}  // Bạn có thể thay số này nếu có dữ liệu đúng
                                        onClick={() => handleProductClick(product.id)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="cursor-pointer">
                    <ListCategory items={categories}/>
                </div>

                <div className="mt-8 sm:px-10 md:px-10 lg:px-22 xl:px-36 pb-6">
                    <div className="bg-white ">
                        <div className="flex flex-row items-center pl-4 h-14 bg-red-200">
                            <img className="w-8 h-8"
                                 src="https://cdn1.fahasa.com/media/wysiwyg/icon-menu/icon_dealhot_new.png"/>
                            <span className="ml-4 text-2xl">Dành cho bạn</span>
                        </div>
                        <div
                            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2 py-4 px-4">
                            {showAllProducts ? products.map((product: Product) => (
                                <CardProduct
                                    key={product.id}
                                    id={product.id}
                                    name={product.name}
                                    img={product.img}
                                    price={product.price}
                                    quantitySold={30}
                                    discount={product.discount}
                                    onClick={() => handleProductClick(product.id)}


                                />
                            )) : products.slice(0, 8).map((product: Product) => (
                                <CardProduct
                                    key={product.id}
                                    id={product.id}
                                    name={product.name}
                                    img={product.img}
                                    price={product.price}
                                    quantitySold={30}
                                    discount={product.discount}
                                    onClick={() => handleProductClick(product.id)}

                                />
                            ))}
                        </div>

                        {/* Nút "Xem thêm" chỉ hiển thị khi có hơn 8 sản phẩm */}
                        <div className="flex justify-center pb-4 ">
                            {products.length > 8 && (
                                <button
                                    className="mt-4 px-6 py-2 text-white rounded-md bg-red-500"
                                    onClick={toggleShowAllProducts}
                                >
                                    {showAllProducts ? "Thu lại" : "Xem thêm"}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
            {isErrorVisible && <Error message={errorMessage} onClose={closeError}/>}
        </>
    );
};

export default Home;
