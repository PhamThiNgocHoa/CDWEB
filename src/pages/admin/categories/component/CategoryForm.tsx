type CategoryFormProps = {
    newCategoryName: string;
    newCategoryImg: string;
    onNameChange: (name: string) => void;
    onImgChange: (file: File | null) => void;
    onAdd: () => void;
    fileInputRef: React.RefObject<HTMLInputElement | null>;
};
const CategoryForm: React.FC<CategoryFormProps> = ({
                                                       newCategoryName,
                                                       newCategoryImg,
                                                       onNameChange,
                                                       onImgChange,
                                                       onAdd,
                                                       fileInputRef,
                                                   }) => {
    const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        onImgChange(file);
    };

    return (
        <div className="mb-4 flex gap-2 items-center">
            <input
                type="text"
                placeholder="Tên danh mục mới"
                className="border p-2 rounded flex-grow"
                value={newCategoryName}
                onChange={(e) => onNameChange(e.target.value)}
            />
            <input
                type="file"
                accept="image/*"
                className="border p-2 rounded"
                onChange={handleImgChange}
                ref={fileInputRef}
            />
            {newCategoryImg && (
                <img src={newCategoryImg} alt="preview" className="w-16 h-16 object-cover rounded"/>
            )}
            <button
                onClick={onAdd}
                className="bg-green-600 text-white px-4 rounded hover:bg-green-700"
            >
                Thêm
            </button>
        </div>
    );
};
export default CategoryForm;