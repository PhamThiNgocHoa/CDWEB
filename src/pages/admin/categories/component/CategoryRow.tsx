import React, { useState, useRef } from "react";
type Category = {
    id: number;
    name: string;
    img: string;
};

type CategoryRowProps = {
    category: Category;
    isEditing: boolean;
    editCategoryName: string;
    editCategoryImg: string;
    onStartEdit: (id: number, name: string, img: string) => void;
    onChangeEditName: (name: string) => void;
    onChangeEditImg: (file: File | null) => void;
    onSaveEdit: () => void;
    onCancelEdit: () => void;
    onDelete: (id: number) => void;
};

const CategoryRow: React.FC<CategoryRowProps> = ({
                                                     category,
                                                     isEditing,
                                                     editCategoryName,
                                                     editCategoryImg,
                                                     onStartEdit,
                                                     onChangeEditName,
                                                     onChangeEditImg,
                                                     onSaveEdit,
                                                     onCancelEdit,
                                                     onDelete,
                                                 }) => {
    const handleEditImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        onChangeEditImg(file);
    };

    return (
        <tr className="border-t">
            <td className="p-3">{category.id}</td>
            <td className="p-3">
                {isEditing ? (
                    <>
                        <input
                            type="file"
                            accept="image/*"
                            className="border p-1 rounded w-full"
                            onChange={handleEditImgChange}
                        />
                        {editCategoryImg && (
                            <img
                                src={editCategoryImg}
                                alt="preview edit"
                                className="w-16 h-16 object-cover rounded mt-2"
                            />
                        )}
                    </>
                ) : (
                    <img src={category.img} alt={category.name} className="w-16 h-16 object-cover rounded" />
                )}
            </td>
            <td className="p-3">
                {isEditing ? (
                    <input
                        type="text"
                        value={editCategoryName}
                        onChange={(e) => onChangeEditName(e.target.value)}
                        className="border p-1 rounded w-full"
                    />
                ) : (
                    category.name
                )}
            </td>
            <td className="p-3 space-x-2">
                {isEditing ? (
                    <>
                        <button
                            onClick={onSaveEdit}
                            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                        >
                            Lưu
                        </button>
                        <button
                            onClick={onCancelEdit}
                            className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                        >
                            Hủy
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={() => onStartEdit(category.id, category.name, category.img)}
                            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                        >
                            Sửa
                        </button>
                        <button
                            onClick={() => onDelete(category.id)}
                            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                        >
                            Xóa
                        </button>
                    </>
                )}
            </td>
        </tr>
    );
};
export default CategoryRow;