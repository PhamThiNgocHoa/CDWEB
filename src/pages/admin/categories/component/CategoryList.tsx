import {Category} from "../../../../models/Category";
import CategoryRow from "./CategoryRow";

type CategoryListProps = {
    categories: Category[];
    editCategoryId: number | null;
    editCategoryName: string;
    editCategoryImg: string;
    onStartEdit: (id: number, name: string, img: string) => void;
    onChangeEditName: (name: string) => void;
    onChangeEditImg: (file: File | null) => void;
    onSaveEdit: () => void;
    onCancelEdit: () => void;
    onDelete: (id: number) => void;
};
const CategoryList: React.FC<CategoryListProps> = ({
                                                       categories,
                                                       editCategoryId,
                                                       editCategoryName,
                                                       editCategoryImg,
                                                       onStartEdit,
                                                       onChangeEditName,
                                                       onChangeEditImg,
                                                       onSaveEdit,
                                                       onCancelEdit,
                                                       onDelete,
                                                   }) => {
    return (
        <table className="min-w-full bg-white rounded shadow">
            <thead>
            <tr className="bg-gray-200 text-left">
                <th className="p-3">ID</th>
                <th className="p-3">Ảnh</th>
                <th className="p-3">Tên danh mục</th>
                <th className="p-3">Thao tác</th>
            </tr>
            </thead>
            <tbody>
            {categories.map((category) => (
                <CategoryRow
                    key={category.id}
                    category={category}
                    isEditing={editCategoryId === category.id}
                    editCategoryName={editCategoryName}
                    editCategoryImg={editCategoryImg}
                    onStartEdit={onStartEdit}
                    onChangeEditName={onChangeEditName}
                    onChangeEditImg={onChangeEditImg}
                    onSaveEdit={onSaveEdit}
                    onCancelEdit={onCancelEdit}
                    onDelete={onDelete}
                />
            ))}
            </tbody>
        </table>
    );
};
export default CategoryList;

