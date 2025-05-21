import Header from "../components/Header";
import Footer from "../components/Footer";
import CardProduct from "../components/CardProduct";
import {useNavigate} from "react-router-dom";

const SearchProduct = () => {
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
                        <div className="col-span-3">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                <CardProduct id={1} name={"KKKKK"} img={"FFFF"} price={100} quantitySold={5}
                                             onClick={() => handleProductClick(1)}/>
                                <CardProduct id={1} name={"KKKKK"} img={"FFFF"} price={100} quantitySold={5}
                                             onClick={() => handleProductClick(1)}/>

                                <CardProduct id={1} name={"KKKKK"} img={"FFFF"} price={100} quantitySold={5}
                                             onClick={() => handleProductClick(1)}/>
                                <CardProduct id={1} name={"KKKKK"} img={"FFFF"} price={100} quantitySold={5}
                                             onClick={() => handleProductClick(1)}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )

}
export default SearchProduct;