import React from "react";
import {FilterType} from "../model/FilterType";

interface ProductFilterProps {
    filters: FilterType;
    onChange: React.Dispatch<React.SetStateAction<FilterType>>;
}

function ProductFilter({ filters, onChange }: ProductFilterProps) {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        onChange(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <select name="category" value={filters.category} onChange={handleChange}
                    className="form-select px-4 py-2 border rounded">
                <option value="">-- Loại sản phẩm --</option>
                <option value="Điện tử">Điện tử</option>
                <option value="Gia dụng">Gia dụng</option>
            </select>
            <select name="price" value={filters.price} onChange={handleChange}
                    className="form-select px-4 py-2 border rounded">
                <option value="">-- Giá --</option>
                <option value="asc">Tăng dần</option>
                <option value="desc">Giảm dần</option>
            </select>
            <select name="stock" value={filters.stock} onChange={handleChange} className="form-select px-4 py-2 border rounded">
                <option value="">-- Tồn kho --</option>
                <option value="low">Thấp</option>
                <option value="high">Cao</option>
            </select>
        </div>
    );
}

export default ProductFilter;
