import React, {useState} from "react";
import {Category} from "../../../../models/Category";
import useCategory from "../../../../hooks/useCategory";
import {useCategoryManagement} from "../../../../hooks/useCategoryManagement";

type CategoryRowProps = {
    category: Category;
    onDelete: (id: string) => void;
    onSaveEdit: (id: string, name: string, description: string, editCode: string) => void;
};

const CategoryRow: React.FC<CategoryRowProps> = ({category, onDelete, onSaveEdit}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editName, setEditName] = useState<string>(category.name);
    const [editDescription, setEditDescription] = useState<string>(category.description ?? "");
    const [editCode, setEditCode] = useState<string>(category.code ?? "");
    const {handleUpdateCategory} = useCategoryManagement();

    const handleOpenModal = () => {
        setEditName(category.name);
        setEditDescription(category.description ?? "");
        setEditCode(category.code ?? "");
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSave = async () => {
        try {
            const updatedCategory: Category = {
                ...category,
                name: editName,
                description: editDescription,
                code: editCode,
            };
            await handleUpdateCategory(updatedCategory);
            onSaveEdit(category.id ?? "", editName, editDescription, editCode);
            setIsModalOpen(false);
        } catch (error) {
        }
    };

    return (
        <>
            <tr className="border-t">
                <td className="p-3">{category.id}</td>
                <td className="p-3">{category.name}</td>
                <td className="p-3">
                    {category.description
                        ? category.description.length > 20
                            ? category.description.substring(0, 20) + "..."
                            : category.description
                        : ""}
                </td>
                <td className="p-3 space-x-2">
                    <button
                        onClick={handleOpenModal}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                        Sửa
                    </button>
                    <button
                        onClick={() => onDelete(category.id ?? "")}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                        Xóa
                    </button>
                </td>
            </tr>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-96">
                        <h2 className="text-lg font-bold mb-4">Chỉnh sửa danh mục</h2>
                        <div className="mb-3">
                            <label className="block text-sm font-medium mb-1">Tên</label>
                            <input
                                type="text"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                className="w-full border rounded px-2 py-1"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Code</label>
                            <input
                                value={editCode}
                                onChange={(e) => setEditCode(e.target.value)}
                                className="w-full border rounded px-2 py-1"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Mô tả</label>
                            <textarea
                                value={editDescription}
                                onChange={(e) => setEditDescription(e.target.value)}
                                className="w-full border rounded px-2 py-1"
                            />
                        </div>

                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={handleSave}
                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                            >
                                Lưu
                            </button>
                            <button
                                onClick={handleCloseModal}
                                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                            >
                                Hủy
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CategoryRow;
