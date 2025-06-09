import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons/faArrowRight";
import { Category } from "../models/Category";

type ListCategoryProps = {
    items: Category[];
};

function ListCategory({ items }: ListCategoryProps) {
    const [scrollIndex, setScrollIndex] = useState(0);
    const listRef = useRef<HTMLDivElement | null>(null);

    const scrollLeft = () => {
        if (listRef.current) {
            const newIndex = Math.max(scrollIndex - 1, 0);
            setScrollIndex(newIndex);
            listRef.current.scrollLeft -= 300;
        }
    };

    const scrollRight = () => {
        if (listRef.current) {
            const newIndex = Math.min(scrollIndex + 1, items.length - 1);
            setScrollIndex(newIndex);
            listRef.current.scrollLeft += 300;
        }
    };

    return (
        <div className="bg-white mt-2 px-3 sm:mx-10 md:mx-10 lg:mx-22 xl:mx-36 rounded-md p-2 mb-4">
            <div className="flex flex-row border-b pb-2">
                <img className="w-12 h-8" src="/image/menu.png" />
                <span className="text-2xl ml-5 ">Danh mục sản phẩm</span>
            </div>
            <div className="flex justify-between items-center">
                <button
                    onClick={scrollLeft}
                    disabled={scrollIndex === 0}
                    className="bg-gray-300 p-2 rounded-md"
                >
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>

                <div
                    ref={listRef}
                    className="flex overflow-hidden whitespace-nowrap space-x-3"
                    style={{ scrollBehavior: "smooth" }}
                >
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="flex flex-col items-center flex-shrink-0 py-4 px-2"
                        >
                            {item.name && (
                                <p className="text-md text-gray-700 mt-2 text-center">
                                    {item.name}
                                </p>
                            )}
                        </div>
                    ))}
                </div>

                <button
                    onClick={scrollRight}
                    disabled={scrollIndex >= items.length - 1}
                    className="bg-gray-300 p-2 rounded-md"
                >
                    <FontAwesomeIcon icon={faArrowRight} />
                </button>
            </div>
        </div>
    );
}

export default ListCategory;
