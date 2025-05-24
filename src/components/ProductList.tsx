import useProduct from "../hooks/useProduct";
import React, {useEffect} from "react";
import CardProduct from "./CardProduct";

const ProductList = () => {
    const {products, error} = useProduct();

    if (error) {
        return <div style={{color: "red"}}>{error}</div>;
    }
    return (
        <div>
            <h2>Category List</h2>
            {products.length === 0 ? (
                <p>No categories available.</p>
            ) : (
                <ul>
                    {products.map((product) => (
                        <div>
                            {/*<CardProduct img={product.img}/>*/}
                        </div>
                    ))}
                </ul>
            )}

        </div>
    );
}
export default ProductList;