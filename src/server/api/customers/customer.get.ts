import {Customer} from "../../../models/Customer";
import {jwtDecode} from "jwt-decode";

export const getCustomerIdFromToken = (): number | null => {
    const token = localStorage.getItem("authToken");
    if (!token) return null;

    try {
        const decoded: any = jwtDecode(token);
        return decoded.customerId || null;
    } catch (error) {
        console.error("Invalid token", error);
        return null;
    }
};

export const getUsers = async (): Promise<Customer[]> => {
    try {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("No authentication token found.");

        const response = await fetch("/api/customer/list", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!response.ok) throw new Error(`Failed to fetch users: ${response.status}`);

        return await response.json();
    } catch (error: any) {
        console.error(error.message);
        throw new Error("Error fetching users.");
    }
};

export const getUser = async (): Promise<Customer> => {
    try {
        const token = localStorage.getItem("authToken");
        const customerId = getCustomerIdFromToken();
        if (!token || !customerId) {
            throw new Error("Authentication token or customer ID is missing.");
        }


        const response = await fetch(`/api/customer/${customerId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!response.ok) throw new Error(`Failed to fetch user: ${response.status}`);

        return await response.json();
    } catch (error: any) {
        console.error(error.message);
        throw new Error("Error fetching user.");
    }
};

export const getQuantity = async (): Promise<any> => {
    try {
        const token = localStorage.getItem("authToken");
        const customerId = getCustomerIdFromToken();
        if (!token || !customerId) {
            throw new Error("Authentication token or customer ID is missing.");
        }
        const response = await fetch(`/api/customer/quantity/${customerId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        })
        if (!response.ok) throw new Error(`Fail to fetch quantity: ${response.status}`);
        return await response.json();


    } catch (error: any) {
        console.error(error.message);
        throw new Error("Fail to fetch quantity");
    }

}

export const checkUsername = async (username: string): Promise<boolean> => {
    try {
        const token = localStorage.getItem("authToken");
        const respone = await fetch(`/api/customer/checkUsername/${username}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,

            }

        });
        if (!respone.ok) throw new Error("Fail to fecth username: " + respone.status);
        const data = await respone.json();
        return data.available;

    } catch (errer) {
        return false;
    }

}









