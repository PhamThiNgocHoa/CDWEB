import {Customer} from "../../../models/Customer";

export const getUser = async (): Promise<Customer> => {
    try {
        const token = localStorage.getItem("authToken");
        if (!token) {
            throw new Error("Authentication token or customer ID is missing.");
        }
        const response = await fetch("/api/customer/profile", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!response.ok) throw new Error(`Failed to fetch user: ${response.status}`);


        const data = await response.json();

        return data.data;
    } catch (error: any) {
        console.error(error.message);
        throw new Error("Error fetching user.");
    }
};

export const getQuantity = async (customerId: number): Promise<number> => {
    try {
        const token = localStorage.getItem("authToken");
        if (!token) {
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
        const data = await response.json();
        return data.data;


    } catch (error: any) {
        console.error(error.message);
        throw new Error("Fail to fetch quantity");
    }

}
export const checkUsername = async (username: string): Promise<boolean> => {
    try {
        const token = localStorage.getItem("authToken");
        const response = await fetch(`/api/customer/checkUsername/${username}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error("Unauthorized or error in response");
        }

        const result = await response.json();
        return result.data === true;
    } catch (err: any) {
        console.error("checkUsername error:", err.message);
        throw new Error("Fail to checkUsername");
    }
};










