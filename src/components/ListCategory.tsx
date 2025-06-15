import React, { useRef } from "react";
import { Category } from "../models/Category";

type ListCategoryProps = {
    items: Category[];
    selectedId: string;
    onCategorySelect: (id: string) => void;
};

function ListCategory({ items, selectedId, onCategorySelect }: ListCategoryProps) {
    const listRef = useRef<HTMLDivElement | null>(null);

    return (
        <div className="bg-white mt-2 px-3 rounded-md p-2 mb-4 w-full">
            <div className="flex flex-row border-b pb-2 items-center">
                <img className="w-12 h-8" src="/image/menu.png" alt="menu" />
                <span className="text-2xl ml-5">Danh mục sản phẩm</span>
            </div>

            <div
                ref={listRef}
                className="flex overflow-x-auto whitespace-nowrap space-x-3 mt-3"
                style={{ scrollBehavior: "smooth" }}
            >
                {items.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => onCategorySelect(item.id ?? "")}
                        className={`min-w-[150px] px-4 py-2 rounded-md border ${
                            selectedId === item.id ? "bg-red-600 text-white" : "bg-gray-200"
                        }`}
                    >
                        {item.name}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default ListCategory;
