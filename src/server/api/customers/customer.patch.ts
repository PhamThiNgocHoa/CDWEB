import {ChangePasswordDto} from "../../../models/ChangePasswordDto";
import ApiService from "../ApiService";

export const changePassword = async (
    customerId: string,
    dto: ChangePasswordDto
): Promise<void> => {

    return ApiService.patch(`/api/customer/changePassword/${customerId}`, dto);
};