import React, { useState } from "react";
import Header from "../../../components/Header";
import Sidebar from "../dasboard/Sidebar";
import ProductUploadButton from "./component/ProductUploadButton";
import ProductFilter from "./component/ProductFilter";
import Footer from "../../../components/Footer";
import { FilterType } from "./model/FilterType";
import ProductTable from "./component/ProductTable";
import { BookForm } from "../../../enums/BookForm";
import useCustomer from "../../../hooks/useCustomer";
import { useToken } from "../../../hooks/useToken";
import { useProductManagement } from "../../../hooks/useProductManagement";
import Notification from "../../../components/Notification";

function ManageProducts() {
    const { user } = useCustomer();
    const token = useToken();
    const {
        products,
        handleDeleteProduct,
        handleUpdateProduct,
        notification,
        setNotification,
        fetchProducts
    } = useProductManagement(token, user?.role);


    const [filters, setFilters] = useState<FilterType>({
        category: "",
        price: "",
        bestSeller: "",
        stock: "",
        bookForm: "" as BookForm,
    });

    return (
        <div>
            <Header />
            <div className="flex min-h-screen bg-gray-100 mt-32">
                <div className="w-64 hidden md:block fixed top-[80px] left-0 h-[calc(100vh-80px)] overflow-y-auto z-40 bg-white shadow-lg">
                    <Sidebar />
                </div>

                <main className="flex-1 ml-0 md:ml-64 p-6 pt-[100px]">
                    {notification && (
                        <Notification
                            message={notification.message}
                            type={notification.type}
                            onClose={() => setNotification(null)}
                        />
                    )}
                    <ProductUploadButton
                        onImportSuccess={async () => {
                            await fetchProducts();
                            setNotification({ message: "Thêm sản phẩm thành công", type: "success" });
                        }}
                    />

                    <ProductFilter filters={filters} onChange={setFilters} />
                    <ProductTable
                        filters={filters}
                        onDeleteProduct={handleDeleteProduct}
                        onUpdateProduct={handleUpdateProduct}
                        products={products}
                        fetchAllProducts={fetchProducts}
                    />

                </main>
            </div>

            <Footer />
        </div>
    );
}

export default ManageProducts;
