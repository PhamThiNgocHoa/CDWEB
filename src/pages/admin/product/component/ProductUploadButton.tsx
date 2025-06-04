import React from "react";

function ProductUploadButton() {
    return (
        <div className="flex justify-end mb-4">
            <input type="file" accept=".xlsx, .xls" className="hidden" id="uploadFile" />
            <label htmlFor="uploadFile" className="bg-red-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700">
                Thêm sản phẩm từ Excel
            </label>
        </div>
    );
}

export default ProductUploadButton;
