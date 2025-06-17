import React, { useState } from "react";
import { Category } from "../../../../models/Category";
import CategoryRow from "./CategoryRow";

type CategoryListProps = {
    categories: Category[];
    onDelete: (id: string) => void;
    onSaveEdit: (id: string, name: string, description: string, code: string) => void;
};

const CategoryList: React.FC<CategoryListProps> = ({
                                                       categories,
                                                       onDelete,
                                                       onSaveEdit,
                                                   }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredCategories = categories.filter((cat) => {
        const term = searchTerm.toLowerCase();
        const idStr = String(cat.code).toLowerCase();
        return (
            idStr.includes(term) || cat.name.toLowerCase().includes(term)
        );
    });

    return (
        <div>
            <input
                type="text"
                placeholder="Tìm kiếm theo ID hoặc tên..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border rounded px-3 py-1 mb-4 w-full max-w-sm"
            />

            <table className="w-full border-collapse border bg-white">
                <thead>
                <tr className="bg-red-200">
                    <th className="border p-2">ID</th>
                    <th className="border p-2">Tên</th>
                    <th className="border p-2">Mô tả</th>
                    <th className="border p-2">Hành động</th>
                </tr>
                </thead>
                <tbody>
                {filteredCategories.length > 0 ? (
                    filteredCategories.map((category) => (
                        <CategoryRow
                            key={category.id}
                            category={category}
                            onDelete={onDelete}
                            onSaveEdit={onSaveEdit}
                        />
                    ))
                ) : (
                    <tr>
                        <td colSpan={4} className="text-center p-4">
                            Không tìm thấy danh mục phù hợp
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default CategoryList;
