import {Product} from "../../../models/Product";

export const getProductById = async (productId: number): Promise<Product> => {
    try {
        const token = localStorage.getItem("authToken");
        const response = await fetch(`/api/product/${productId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        })
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || "Unauthorized or error in response");
        }
        const data = await response.json();
        return data.data;

    } catch (err) {
        console.error("Error:", err);
        throw new Error("Failed to fetch product");
    }
}
export const getListProduct = async (): Promise<Product[]> => {
    try {
        const token = localStorage.getItem("authToken");
        const response = await fetch("/api/product/list", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || "Unauthorized or error in response");

        }
        const data = await response.json();
        return data.data;
    } catch (err) {
        console.error("Error:", err);
        throw new Error("Failed to fetch product");
    }
}
