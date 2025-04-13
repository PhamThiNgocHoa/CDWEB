import {ChangePasswordDto} from "../../../models/ChangePasswordDto";

export const changePassword = async (
    customerId: number,
    dto: ChangePasswordDto
): Promise<void> => {
    const response = await fetch(`/api/customer/changePassword/${customerId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dto)
    });

    if (!response.ok) {
        try {
            const data = await response.json();
            throw new Error(data.message || "Change password failed");
        } catch (err) {
            throw new Error("Unexpected error occurred");
        }
    }

};