import React from 'react';

type NavItem = {
    image: string;
    text?: string;
};

type NavProps = {
    items: NavItem[];
};

function Nav({ items }: NavProps) {
    return (
        <div className="bg-white mt-2 px-3 sm:mx-10 md:mx-10 lg:mx-22 xl:mx-36 rounded-md p-3">
            <div className="flex overflow-x-auto whitespace-nowrap space-x-6">
                {items.map((item, index) => (
                    <div key={index} className="flex flex-col items-center flex-shrink-0 py-4 px-5" >
                        <img
                            src={item.image}
                            alt={`nav-image-${index}`}
                            className="h-12 w-12 object-cover rounded-md"
                        />
                        {item.text && (
                            <p className="text-sm text-gray-700 mt-2 text-center">{item.text}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}


export default Nav;
