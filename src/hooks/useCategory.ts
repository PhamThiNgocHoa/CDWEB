import {useEffect, useState} from "react";
import {Category} from "../models/Category";
import {getCategoryById, getListCategory} from "../server/api/category/category.get";
import {getListProduct} from "../server/api/product/product.get";

// Hook sử dụng cho Category
function useCategory() {
    const [error, setError] = useState<string | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(false);


    const handleError = (error: unknown) => {
        const message = error instanceof Error ? error.message : "Unknown error occurred";
        setError(message);
        throw new Error(message);
    };

    const refreshCategories = async () => {
        try {
            const data = await getListCategory();
            setCategories(data);
        } catch (error) {
            handleError(error);
        }
    };

    useEffect(() => {
        refreshCategories();
    }, []);

    const fetchGetCategoryById = async (id: number): Promise<Category | null> => {
        try {
            return await getCategoryById(id);
        } catch (error) {
            handleError(error);
            return null;
        } finally {
            setLoading(false);
        }
    }

    return {
        categories,
        error,
        fetchGetCategoryById,
        setCategories,
        refreshCategories,
    };
}

export default useCategory;
