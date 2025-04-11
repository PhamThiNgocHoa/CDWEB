import {Customer} from "../../../models/Customer";

export const updateCustomer = async (customerId: number, customer: Customer): Promise<void> => {
    const token = localStorage.getItem("authToken");

    const response = await fetch(`/api/customer/${customerId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token || ""}`,
        },
        body: JSON.stringify(customer),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Cập nhật thất bại");
    }

    return;
};
