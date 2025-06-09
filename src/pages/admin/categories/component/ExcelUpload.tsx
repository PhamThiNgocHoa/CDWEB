type ExcelUploadProps = {
    onFileUpload: (file: File | null) => void;
    fileInputRef: React.RefObject<HTMLInputElement | null>;
    disabled?: boolean;  // thêm prop này
};

const ExcelUpload: React.FC<ExcelUploadProps> = ({ onFileUpload, fileInputRef, disabled = false }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        onFileUpload(file);
        e.target.value = ""; // reset input để có thể chọn lại file cũ
    };

    return (
        <div className="mb-6">
            <label
                htmlFor="excel-upload"
                className={`cursor-pointer px-4 py-2 rounded text-white ${
                    disabled ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
                }`}
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
                disabled={disabled} // truyền xuống input
            />
        </div>
    );
};

export default ExcelUpload;
