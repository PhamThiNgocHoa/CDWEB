import React, {useRef} from "react";
import {importProductExcel} from "../../../../server/api/admin/admin.post";

interface Props {
    onImportSuccess?: () => void;
}

function ProductUploadButton({onImportSuccess}: Props) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            await importProductExcel(file);
            onImportSuccess?.();
        } catch (error) {
        }
    };

    return (
        <div className="flex justify-end mb-4">
            <input
                type="file"
                accept=".xlsx, .xls"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                id="uploadFile"
            />
            <label
                htmlFor="uploadFile"
                className="bg-red-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700"
            >
                Thêm sản phẩm từ Excel
            </label>
        </div>
    );
}

export default ProductUploadButton;
