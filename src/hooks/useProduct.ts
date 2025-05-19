import {useState} from "react";
import {Product} from "../models/Product";
import {getListProduct, getProductById, getProductSale} from "../server/api/product/product.get";
import {ProductResponse} from "../models/response/ProductResponse";

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

    const fetchGetListProduct = async (): Promise<ProductResponse[]> => {
        setLoading(true);
        try {
            const data = await getListProduct();
            setProducts(data);
            return data;
        } catch (error) {
            handleError(error);
            return [];
        } finally {
            setLoading(false);
        }
    };

    const fetchGetProductById = async (id: number): Promise<Product | null> => {
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

    const fetchGetListProductSale = async (): Promise<ProductResponse[]> => {
        setLoading(true);
        try {
            return await getProductSale();
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
        fetchGetListProduct,
        fetchGetProductById,
        setProducts,
        fetchGetListProductSale,
        saleProducts, setSaleProducts,
    };
}

export default useProduct;
