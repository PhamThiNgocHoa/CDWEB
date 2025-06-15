import {useState} from "react";
import {Category} from "../models/Category";
import {addCategory} from "../server/api/admin/admin.post";
import {updateCategory} from "../server/api/admin/admin.put";
import {deleteCategory} from "../server/api/admin/admin.delete";
import {getListCategory} from "../server/api/category/category.get";

export const useCategoryManagement = () => {
    const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);

    const refreshCategories = async () => {
        const data = await getListCategory();
        setCategories(data);
    }
    const handleAddCategory = async (category: Category): Promise<Category | undefined> => {
        try {
            const data = await addCategory(category);
            await refreshCategories();
            setNotification({message: "Thêm danh mục thành công", type: "success"});
            return data;
        } catch {
            setNotification({message: "Lỗi khi thêm danh mục", type: "error"});
            return undefined;
        }
    };

    const handleUpdateCategory = async (category: Category) => {
        try {
            await updateCategory(category);
            await refreshCategories();
            setNotification({message: "Cập nhật danh mục thành công", type: "success"});
        } catch {
            setNotification({message: "Lỗi khi cập nhật danh mục", type: "error"});
        }
    };

    const handleDeleteCategory = async (id: string) => {
        try {
            await deleteCategory(id);
            setCategories(categories.filter((cat) => cat.id !== id));
            setNotification({message: "Xoá danh mục thành công", type: "success"});
        } catch {
            setNotification({message: "Xoá danh mục thất bại", type: "error"});
        }
    };

    return {
        categories,
        setCategories,
        refreshCategories,
        notification,
        setNotification,
        handleAddCategory,
        handleUpdateCategory,
        handleDeleteCategory,
    };
};

