import {ChangePasswordDto} from "../../../models/ChangePasswordDto";
import ApiService from "../ApiService";

export const changePassword = async (
    customerId: number,
    dto: ChangePasswordDto
): Promise<void> => {

    const {data} = await ApiService.patch(`/api/customer/changePassword/${customerId}`, dto);
    return data;
};