import {useCallback, useEffect, useState} from "react";
import {Product} from "../models/Product";
import {
    filterProduct,
    getListProduct,
    getProductById,
    getProductSale,
    listFindByName,
    searchProduct
} from "../server/api/product/product.get";
import {BookForm} from "../enums/BookForm";
import {ProductResponse} from "../models/response/ProductResponse";

type FilterParams = {
    name?: string;
    categoryId?: string;
    bookForm?: BookForm;
    minPrice?: number;
    maxPrice?: number;
};

function useProduct() {
    const [products, setProducts] = useState<ProductResponse[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [saleProducts, setSaleProducts] = useState<ProductResponse[]>([]);
    const [params, setParams] = useState<FilterParams>({});

    const handleError = (error: unknown) => {
        const message = error instanceof Error ? error.message : "Unknown error occurred";
        setError(message);
        throw new Error(message);
    };

    // Chỉ gọi 1 lần khi load để lấy tất cả sản phẩm nếu không có filter
    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                const data = await getListProduct();
                setProducts(data);
            } catch (error) {
                handleError(error);
            }
        };
        fetchAllProducts();
    }, []);

    // Gọi API lấy sản phẩm khuyến mãi khi load
    useEffect(() => {
        const fetchSaleProducts = async () => {
            try {
                const data = await getProductSale();
                setSaleProducts(data);
            } catch (error) {
                handleError(error);
            }
        };
        fetchSaleProducts();
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
        error,
        loading,
        fetchGetProductById,
        setProducts,
        saleProducts,
        setSaleProducts,
        fetchSearchProductByName,
        fetchListFindByName,
        params,
        setParams,
    };
}

export default useProduct;
