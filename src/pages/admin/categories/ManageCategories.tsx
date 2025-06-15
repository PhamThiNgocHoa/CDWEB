import React, {useRef, useState} from "react";
import Header from "../../../components/Header";
import Sidebar from "../dasboard/Sidebar";
import CategoryForm from "./component/CategoryForm";
import CategoryList from "./component/CategoryList";
import Footer from "../../../components/Footer";
import useCategory from "../../../hooks/useCategory";
import Notification from "../../../components/Notification";
import {deleteCategory} from "../../../server/api/admin/admin.delete";
import {importCategoryExcel} from "../../../server/api/admin/admin.post";

import {useCategoryManagement} from "../../../hooks/useCategoryManagement";

function ManageCategories() {
    const {handleAddCategory} = useCategoryManagement();
    const {categories, setCategories, refreshCategories} = useCategory();


    const [newCategoryName, setNewCategoryName] = useState("");
    const [newCategoryDescription, setNewCategoryDescription] = useState("");
    const [newCode, setNewCode] = useState("");
    const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);

    const newFileInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async () => {
        try {
            const newCategory = await handleAddCategory({
                name: newCategoryName.trim(),
                description: newCategoryDescription.trim(),
                code: newCode.trim(),
            });

            if (newCategory) {
                await refreshCategories();
                setNewCategoryName("");
                setNewCategoryDescription("");
                setNewCode("");
                setNotification({message: "Thêm danh mục thành công", type: "success"});
            } else {
                setNotification({message: "Thêm danh mục thất bại", type: "error"});
            }
        } catch (error) {
            setNotification({message: "Thêm danh mục thất bại", type: "error"});
        }
    };

    const handleImportExcel = async (file: File) => {
        try {
            await importCategoryExcel(file);
            await refreshCategories();
            setNotification({message: "Import danh mục thành công", type: "success"});
        } catch (error) {
            setNotification({message: "Import danh mục thất bại", type: "error"});
        }
    };


    const saveEdit = (id: string, name: string, description: string, code: string) => {
        setCategories(
            categories.map((cat) =>
                cat.id === id
                    ? {...cat, name, description, code}
                    : cat
            )
        );
        setNotification({message: "Cập nhật danh mục thành công", type: "success"});
    };

    const handleDeleteCategory = async (id: string) => {
        try {
            await deleteCategory(id);
            setCategories(categories.filter((cat) => cat.id !== id));
            setNotification({message: "Xóa danh mục thành công", type: "success"});
        } catch (error) {
            setNotification({message: "Xóa danh mục thất bại, thử lại sau", type: "error"});
            console.error("Delete category failed:", error);
        }
    };


    return (
        <>
            <div>
                <Header/>
                <div className="flex min-h-screen bg-gray-100 mt-36">
                    {notification && (
                        <Notification message={notification.message} type={notification.type}
                                      onClose={() => setNotification(null)}/>
                    )}
                    <div
                        className="w-64 hidden md:block fixed top-[80px] left-0 h-[calc(100vh-80px)] overflow-y-auto z-40 bg-white shadow-lg">
                        <Sidebar/>
                    </div>
                    <main className="flex-1 ml-0 md:ml-64 p-6 pt-[100px]">
                        <CategoryForm
                            newCategoryName={newCategoryName}
                            onNameChange={setNewCategoryName}
                            newcode={newCode}
                            onCode={setNewCode}
                            onAdd={handleSubmit}
                            fileInputRef={newFileInputRef}
                            newCategoryDescription={newCategoryDescription}
                            onDescriptionChange={setNewCategoryDescription}
                            onImportExcel={handleImportExcel}/>

                        <CategoryList
                            categories={categories}
                            onSaveEdit={saveEdit}
                            onDelete={handleDeleteCategory}
                        />
                    </main>
                </div>
                <Footer/>
            </div>
        </>
    );
}

export default ManageCategories;
