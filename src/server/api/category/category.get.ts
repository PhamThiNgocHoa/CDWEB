import {Category} from "../../../models/Category";

export const getListCategory = async (): Promise<Category[]> => {
    const token = localStorage.getItem("authToken");
    const respones = await fetch("/api/category/list", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }

    });

    if (!respones.ok) {
        throw new Error("Unauthorized or error in response");
    }
    return await respones.json();
}

export const getCategoryById = async (categoryId: number): Promise<Category> => {
    const token = localStorage.getItem("authToken");
    const respones = await fetch(`/api/category/${categoryId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }

    });
    if (!respones.ok) {
        throw new Error("Unauthorized or error in response");
    }
    return await respones.json();
}