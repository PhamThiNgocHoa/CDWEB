type ExcelUploadProps = {
    onFileUpload: (file: File | null) => void;
    fileInputRef: React.RefObject<HTMLInputElement | null>;
};

const ExcelUpload: React.FC<ExcelUploadProps> = ({ onFileUpload, fileInputRef }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        onFileUpload(file);
    };

    return (
        <div className="mb-6">
            <label
                htmlFor="excel-upload"
                className="cursor-pointer bg-red-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Thêm file Excel
            </label>
            <input
                id="excel-upload"
                type="file"
                accept=".xls,.xlsx"
                className="hidden"
                onChange={handleChange}
                ref={fileInputRef}
            />
        </div>
    );
};
export default ExcelUpload;