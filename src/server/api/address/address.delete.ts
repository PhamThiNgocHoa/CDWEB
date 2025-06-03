import ApiService from "../ApiService";

export const deleteAddress = async (id: string): Promise<void> => {
    return ApiService.delete(`/api/address/${id}`);
}