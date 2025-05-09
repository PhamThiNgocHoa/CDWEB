import Header from "../../components/Header";
import Footer from "../../components/Footer";
import '../home/style.css'
import Banner from "../../components/Banner";
import Nav from "../../components/Nav";
import ListProducts from "../../components/ProductList";
import useProduct from "../../hooks/useProduct";
import {useEffect} from "react";
import ProductList from "../../components/ProductList";
import CategoryList from "../../components/user/CategoryList";

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

function Home() {

    return (
        <>
            <Header/>
            <div className="bg-gray-100 ">
                <Banner mainImages={mainImages} sideImages={sideImages}/>
                <Nav items={navItems}/>
                {/*sale*/}
                <div className="w-full bg-red-400 mt-4 mb-4 pt-3 pb-3">
                    <div className="flex flex-row justify-between sm:mx-10 md:mx-10 lg:mx-22 xl:mx-36 bg-white rounded-md p-5">
                        <img src="../image/label-flashsale.svg"/>
                        <p className="text-blue-500 text-md font-semibold cursor-pointer">Xem tất cả</p>
                    </div>
                    <div className="mt-4">
                        <ProductList/>
                        <CategoryList/>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default Home;
