import React from "react";
import {FilterType} from "../model/FilterType";
import {BookForm, BookFormDisplayName} from "../../../../enums/BookForm";

interface ProductFilterProps {
    filters: FilterType;
    onChange: React.Dispatch<React.SetStateAction<FilterType>>;
}

function ProductFilter({ filters, onChange }: ProductFilterProps) {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;

        onChange(prev => ({
            ...prev,
            [name]: name === "bookForm" ? (value as BookForm) : value,
        }));
    };


    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <select
                name="bookForm"
                value={filters.bookForm}
                onChange={handleChange}
                className="form-select px-4 py-2 border rounded"
            >
                <option value="">-- Loại sách --</option>
                {Object.values(BookForm).map((form) => (
                    <option key={form} value={form}>
                        {BookFormDisplayName[form]}
                    </option>
                ))}
            </select>

            <select name="price" value={filters.price} onChange={handleChange}
                    className="form-select px-4 py-2 border rounded">
                <option value="">-- Giá --</option>
                <option value="asc">Tăng dần</option>
                <option value="desc">Giảm dần</option>
            </select>
            <select name="stock" value={filters.stock} onChange={handleChange}
                    className="form-select px-4 py-2 border rounded">
                <option value="">-- Tồn kho --</option>
                <option value="low">Thấp</option>
                <option value="high">Cao</option>
            </select>
        </div>
    );
}

export default ProductFilter;
