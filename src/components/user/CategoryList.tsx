import React, { useEffect } from "react";
import useCategory from "../../hooks/useCategory";

const CategoryList = () => {
    const { categories, error } = useCategory();

    if (error) {
        return <div style={{ color: "red" }}>{error}</div>;
    }

    return (
        <div>
            <h2>Category List</h2>
            {categories.length === 0 ? (
                <p>No categories available.</p>
            ) : (
                <ul>
                    {categories.map((category) => (
                        <li key={category.id}>
                            {category.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CategoryList;
