import { useState, useEffect } from "react";
import { Product } from "../models/Product";
import { getListProduct } from "../server/api/product/product.get";
import { uploadImage } from "../server/api/imageUpload/image.post";
import { updateProduct } from "../server/api/admin/admin.put";
import { deleteProduct } from "../server/api/admin/admin.delete";
import { ProductResponse } from "../models/response/ProductResponse";

export const useProductManagement = (token: string | null, role: string | undefined) => {
    const [products, setProducts] = useState<ProductResponse[]>([]);
    const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchProducts = async () => {
        if (!token || role !== "ADMIN") return;
        try {
            const data = await getListProduct();
            setProducts(data);
        } catch {
            setNotification({ message: "Không thể lấy sản phẩm", type: "error" });
        }
    };

    const handleUpload = async (file: File) => {
        try {
            const imageUrl = await uploadImage(file);
            console.log("Đường dẫn ảnh:", imageUrl);
            return imageUrl;
        } catch (err) {
            console.error("Lỗi khi upload ảnh", err);
        }
    };

    const handleUpdateProduct = async (id: string, dto: Product): Promise<ProductResponse | null> => {
        try {
            const updated = await updateProduct(id, dto);
            await fetchProducts();
            setNotification({ message: "Cập nhật sản phẩm thành công", type: "success" });
            return updated;
        } catch {
            setNotification({ message: "Cập nhật sản phẩm thất bại", type: "error" });
            return null;
        }
    };

    const handleDeleteProduct = async (productId: string) => {
        try {
            await deleteProduct(productId);
            await fetchProducts();
            setNotification({ message: "Xoá sản phẩm thành công", type: "success" });
        } catch {
            setNotification({ message: "Xoá sản phẩm thất bại", type: "error" });
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [token, role]);

    return {
        products,
        setProducts,
        notification,
        setNotification,
        loading,
        setLoading,
        fetchProducts,
        handleUpload,
        handleUpdateProduct,
        handleDeleteProduct,
    };
};
