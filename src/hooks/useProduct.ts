import { useEffect, useRef, useState } from "react";
import {
    getListProduct,
    getProductById,
    getProductSale,
    listFindByName,
    searchProduct
} from "../server/api/product/product.get";
import { BookForm } from "../enums/BookForm";
import { ProductResponse } from "../models/response/ProductResponse";

type FilterParams = {
    name?: string;
    categoryId?: string;
    bookForm?: BookForm;
    minPrice?: number;
    maxPrice?: number;
};

function useProduct() {
    const [products, setProducts] = useState<ProductResponse[]>([]);
    const [saleProducts, setSaleProducts] = useState<ProductResponse[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [params, setParams] = useState<FilterParams>({});
    const hasFetched = useRef<boolean>(false); // Dùng useRef để ngăn gọi nhiều lần

    const handleError = (error: unknown) => {
        const message = error instanceof Error ? error.message : "Unknown error occurred";
        setError(message);
        console.error("useProduct error:", message);
        // ❌ Không throw nữa
    };

    const fetchAllProducts = async () => {
        try {
            const data = await getListProduct();
            setProducts(data);
        } catch (error) {
            handleError(error);
        }
    };

    const fetchSaleProducts = async () => {
        try {
            const data = await getProductSale();
            setSaleProducts(data);
        } catch (error) {
            handleError(error);
        }
    };

    useEffect(() => {
        if (!hasFetched.current) {
            hasFetched.current = true;
            fetchAllProducts();
            fetchSaleProducts();
        }
    }, []);

    const fetchGetProductById = async (id: string): Promise<ProductResponse | null> => {
        setLoading(true);
        try {
            return await getProductById(id);
        } catch (error) {
            handleError(error);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const fetchSearchProductByName = async (name: string): Promise<ProductResponse[]> => {
        setLoading(true);
        try {
            return await searchProduct(name);
        } catch (error) {
            handleError(error);
            return [];
        } finally {
            setLoading(false);
        }
    };

    const fetchListFindByName = async (name: string): Promise<ProductResponse[]> => {
        setLoading(true);
        try {
            return await listFindByName(name);
        } catch (error) {
            handleError(error);
            return [];
        } finally {
            setLoading(false);
        }
    };

    return {
        products,
        saleProducts,
        error,
        loading,
        fetchGetProductById,
        fetchSearchProductByName,
        fetchListFindByName,
        setProducts,
        setSaleProducts,
        fetchAllProducts,
        params,
        setParams,
    };
}

export default useProduct;
