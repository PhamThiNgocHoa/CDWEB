import ExcelUpload from "./ExcelUpload";
import {useRef, useState} from "react";

type CategoryFormProps = {
    newCategoryName: string;
    newCategoryDescription: string;
    newcode: string;
    onNameChange: (name: string) => void;
    onCode: (code: string) => void;
    onDescriptionChange: (description: string) => void;
    onAdd: () => void;
    fileInputRef: React.RefObject<HTMLInputElement | null>;
    onImportExcel: (file: File) => Promise<void>;  // thêm prop này
};

const CategoryForm: React.FC<CategoryFormProps> = ({
                                                       newCategoryName,
                                                       newCategoryDescription,
                                                       newcode,
                                                       onNameChange,
                                                       onDescriptionChange,
                                                       onCode,
                                                       onAdd,
                                                       fileInputRef,
                                                       onImportExcel,  // nhận prop
                                                   }) => {
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const excelFileInputRef = useRef<HTMLInputElement>(null);

    const handleShowForm = () => setShowForm(true);
    const handleHideForm = () => setShowForm(false);

    const handleAddClick = () => {
        onAdd();
        setShowForm(false);
    };

    const handleExcelFileUpload = async (file: File | null) => {
        if (!file) return;
        setLoading(true);
        setError(null);
        try {
            await onImportExcel(file);
        } catch (err) {
            setError("Lỗi khi import file Excel");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mb-4">
            {!showForm ? (
                <div className="flex items-center gap-4">
                    <ExcelUpload
                        onFileUpload={handleExcelFileUpload}
                        fileInputRef={excelFileInputRef}
                        disabled={loading}
                    />
                    <button
                        onClick={handleShowForm}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 -mt-6"
                        disabled={loading}
                    >
                        Thêm danh mục mới
                    </button>
                    {loading && <span>Đang tải...</span>}
                    {error && <span className="text-red-600">{error}</span>}
                </div>
            ) : (
                <div className="flex flex-col gap-2 border p-4 rounded shadow-md max-w-md">
                    <input
                        type="text"
                        placeholder="Tên danh mục mới"
                        className="border p-2 rounded"
                        value={newCategoryName}
                        onChange={(e) => onNameChange(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="code"
                        className="border p-2 rounded"
                        value={newcode}
                        onChange={(e) => onCode(e.target.value)}
                    />
                    <textarea
                        placeholder="Mô tả danh mục mới"
                        className="border p-2 rounded resize-none"
                        value={newCategoryDescription}
                        onChange={(e) => onDescriptionChange(e.target.value)}
                        rows={3}
                    />
                    <div className="flex gap-2 justify-start">
                        <button
                            onClick={handleAddClick}
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                        >
                            Thêm
                        </button>
                        <button
                            onClick={handleHideForm}
                            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                        >
                            Hủy
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoryForm;
