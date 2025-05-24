import ApiService from "../ApiService";

export const initPasswordReset = async (username: string): Promise<void> => {
    return ApiService.post(`/api/customer/initPasswordReset/${username}`, {}, {}, false);
};

export const resetPassword = async (
    username: string | undefined,
    resetCode: string,
    newPassword: string
): Promise<void> => {
    const params = new URLSearchParams({
        resetCode,
        newPassword
    });

    return ApiService.post(`/api/customer/resetPassword/${username}?${params.toString()}`, {}, {}, false);
};















