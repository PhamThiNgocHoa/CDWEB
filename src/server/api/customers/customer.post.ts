import ApiService from "../ApiService";

export const initPasswordReset = async (username: string): Promise<void> => {
    const {data} = await ApiService.post(`/api/customer/initPasswordReset/${username}`, {}, {}, false);
    return data;
};

export const resetPassword = async (
    username: string,
    resetCode: string,
    newPassword: string
): Promise<void> => {
    const params = new URLSearchParams({
        resetCode,
        newPassword
    });

    const {data} = await ApiService.post(`/api/customer/resetPassword/${username}?${params.toString()}`, {}, {}, false);
    return data;
};















