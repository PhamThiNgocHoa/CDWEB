import { useEffect, useRef, useState } from "react";
import { Category } from "../models/Category";
import { getCategoryById, getListCategory } from "../server/api/category/category.get";

function useCategory() {
    const [error, setError] = useState<string | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const hasFetched = useRef<boolean>(false); // Dùng để kiểm tra đã fetch chưa

    const handleError = (error: unknown) => {
        const message = error instanceof Error ? error.message : "Unknown error occurred";
        setError(message);
        throw new Error(message);
    };

    const refreshCategories = async (): Promise<Category[] | undefined> => {
        try {
            setLoading(true);
            const data = await getListCategory();
            setCategories(data);
            return data;
        } catch (error) {
            handleError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!hasFetched.current) {
            hasFetched.current = true;
            refreshCategories();
        }
    }, []);

    const fetchGetCategoryById = async (id: number): Promise<Category | null> => {
        try {
            setLoading(true);
            return await getCategoryById(id);
        } catch (error) {
            handleError(error);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return {
        categories,
        error,
        fetchGetCategoryById,
        setCategories,
        refreshCategories,
    };
}

export default useCategory;
