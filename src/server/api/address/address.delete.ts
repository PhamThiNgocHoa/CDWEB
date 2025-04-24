import ApiService from "../ApiService";

export const deleteAddress = async (id: number): Promise<void> => {
    return ApiService.delete(`/api/address/${id}`);
}