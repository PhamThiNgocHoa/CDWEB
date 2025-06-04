import {useRef, useState} from "react";
import {Category} from "../../../models/Category";
import Header from "../../../components/Header";
import Sidebar from "../dasboard/Sidebar";
import ExcelUpload from "./component/ExcelUpload";
import CategoryForm from "./component/CategoryForm";
import CategoryList from "./component/CategoryList";
import Footer from "../../../components/Footer";

function ManageCategories() {
    const [categories, setCategories] = useState<Category[]>([
        {
            id: 1,
            name: "Điện thoại",
            img: "https://nhasachphuongnam.com/images/detailed/244/hieu-ve-trai-tim-tb-2023.jpg",
        },
        {
            id: 2,
            name: "Laptop",
            img: "https://nhasachphuongnam.com/images/detailed/244/hieu-ve-trai-tim-tb-2023.jpg",
        },
        {
            id: 3,
            name: "Phụ kiện",
            img: "https://nhasachphuongnam.com/images/detailed/244/hieu-ve-trai-tim-tb-2023.jpg",
        },
    ]);

    // Thêm category mới
    const [newCategoryName, setNewCategoryName] = useState("");
    const [newCategoryImg, setNewCategoryImg] = useState("");

    // Sửa category
    const [editCategoryId, setEditCategoryId] = useState<number | null>(null);
    const [editCategoryName, setEditCategoryName] = useState("");
    const [editCategoryImg, setEditCategoryImg] = useState("");

    const newFileInputRef = useRef<HTMLInputElement>(null);
    const excelFileInputRef = useRef<HTMLInputElement>(null);

    // Convert file thành base64 string
    const fileToBase64 = (file: File): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === "string") resolve(reader.result);
                else reject("FileReader result is not string");
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });

    // Xử lý upload ảnh cho thêm mới
    const handleNewImgChange = async (file: File | null) => {
        if (file) {
            const base64 = await fileToBase64(file);
            setNewCategoryImg(base64);
        } else {
            setNewCategoryImg("");
        }
    };

    // Xử lý upload ảnh khi sửa
    const handleEditImgChange = async (file: File | null) => {
        if (file) {
            const base64 = await fileToBase64(file);
            setEditCategoryImg(base64);
        }
    };

    const handleAddCategory = () => {
        if (!newCategoryName.trim()) return;
        const newId = categories.length ? categories[categories.length - 1].id + 1 : 1;
        setCategories([
            ...categories,
            {id: newId, name: newCategoryName, img: newCategoryImg || "https://via.placeholder.com/80"},
        ]);
        setNewCategoryName("");
        setNewCategoryImg("");
        if (newFileInputRef.current) newFileInputRef.current.value = "";
    };

    const startEditing = (id: number, name: string, img: string) => {
        setEditCategoryId(id);
        setEditCategoryName(name);
        setEditCategoryImg(img);
    };

    const saveEdit = () => {
        if (!editCategoryName.trim() || editCategoryId === null) return;
        setCategories(
            categories.map((cat) =>
                cat.id === editCategoryId
                    ? {...cat, name: editCategoryName, img: editCategoryImg || "https://via.placeholder.com/80"}
                    : cat
            )
        );
        setEditCategoryId(null);
        setEditCategoryName("");
        setEditCategoryImg("");
    };

    const cancelEdit = () => {
        setEditCategoryId(null);
        setEditCategoryName("");
        setEditCategoryImg("");
    };

    const deleteCategory = (id: number) => {
        if (window.confirm("Bạn có chắc muốn xóa danh mục này?")) {
            setCategories(categories.filter((cat) => cat.id !== id));
        }
    };

    const handleExcelFileUpload = (file: File | null) => {
        if (file) {
            alert(`Bạn vừa upload file: ${file.name}. Xử lý import danh mục từ file Excel ở đây.`);
            // TODO: xử lý đọc file Excel và thêm danh mục
        }
    };

    return (
        <>
            <div>
                <Header/>
                <div className="flex min-h-screen bg-gray-100">
                    <Sidebar/>
                    <main className="flex-1 p-6 space-y-6">
                        <ExcelUpload onFileUpload={handleExcelFileUpload} fileInputRef={excelFileInputRef}/>

                        <CategoryForm
                            newCategoryName={newCategoryName}
                            newCategoryImg={newCategoryImg}
                            onNameChange={setNewCategoryName}
                            onImgChange={handleNewImgChange}
                            onAdd={handleAddCategory}
                            fileInputRef={newFileInputRef}
                        />

                        <CategoryList
                            categories={categories}
                            editCategoryId={editCategoryId}
                            editCategoryName={editCategoryName}
                            editCategoryImg={editCategoryImg}
                            onStartEdit={startEditing}
                            onChangeEditName={setEditCategoryName}
                            onChangeEditImg={handleEditImgChange}
                            onSaveEdit={saveEdit}
                            onCancelEdit={cancelEdit}
                            onDelete={deleteCategory}
                        />
                    </main>
                </div>
                <Footer/>
            </div>
        </>
    );
}

export default ManageCategories;