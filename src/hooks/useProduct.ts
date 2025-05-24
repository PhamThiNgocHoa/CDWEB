import {useEffect, useState} from "react";
import {Product} from "../models/Product";
import {
    getListProduct,
    getProductById,
    getProductSale,
    listFindByName,
    searchProduct
} from "../server/api/product/product.get";

function useProduct() {
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [saleProducts, setSaleProducts] = useState<Product[]>([]);


    const handleError = (error: unknown) => {
        const message = error instanceof Error ? error.message : "Unknown error occurred";
        setError(message);
        throw new Error(message);
    };


    useEffect(() => {
        const fetchData = async () => {
            const data = await getListProduct()
            setProducts(data);
        }
        fetchData();
    }, [getListProduct]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getProductSale()
            setSaleProducts(data);
        }
        fetchData();
    }, [getProductSale]);

    const fetchGetProductById = async (id: string): Promise<Product | null> => {
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


    const fetchSearchProductByName = async (name: string): Promise<Product[]> => {
        setLoading(true);
        try {
            return await searchProduct(name);
        } catch (error) {
            handleError(error);
            return [];
        } finally {
            setLoading(false);
        }
    }

    const fetchListFindByName = async (name: string): Promise<Product[]> => {
        setLoading(true);
        try {
            return await listFindByName(name);
        } catch (error) {
            handleError(error);
            return [];
        } finally {
            setLoading(false);
        }
    }

    return {
        products,
        error,
        loading,
        fetchGetProductById,
        setProducts,
        saleProducts, setSaleProducts,
        fetchSearchProductByName,
        fetchListFindByName,
    };
}

export default useProduct;
