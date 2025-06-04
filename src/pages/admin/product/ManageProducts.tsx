import React, { useState } from "react";
import Header from "../../../components/Header";
import Sidebar from "../dasboard/Sidebar";
import ProductUploadButton from "./component/ProductUploadButton";
import ProductFilter from "./component/ProductFilter";
import Footer from "../../../components/Footer";
import {FilterType} from "./model/FilterType";
import ProductTable from "./component/ProductTable";

function ManageProducts() {
    const [filters, setFilters] = useState<FilterType>({
        category: "",
        price: "",
        bestSeller: "",
        stock: ""
    });


    return (
        <div>
            <Header />
            <div className="flex min-h-screen bg-gray-100">
                <Sidebar />
                <main className="flex-1 p-6">
                    <ProductUploadButton />
                    <ProductFilter filters={filters} onChange={setFilters} />
                    <ProductTable filters={filters} />
                </main>
            </div>
            <Footer />
        </div>
    );
}
export default ManageProducts;
