import {useState} from "react";
import {AddressRequest} from "../models/request/AddressRequest";
import {createAddress} from "../server/api/address/address.post";
import {deleteAddress} from "../server/api/address/address.delete";
import {updateAddress} from "../server/api/address/address.put";
import {Address} from "../models/Address";
import {getAddressByCustomerId} from "../server/api/address/address.get";
import {getTotalAmount} from "../server/api/order/order.post";
import {OrderDetailRequest} from "../models/request/OrderDetailRequest";
import useCustomer from "./useCustomer";

const useAddress = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [createdAddress, setCreatedAddress] = useState<AddressRequest | null>(null);
    const [address, setAddress] = useState<AddressRequest[] | null>(null);
    const [adr, setAdr] = useState<Address[]>([]);
    const {user} = useCustomer();

    const token = localStorage.getItem("authToken");
    if (!token || token.trim() === "" || token === "null") {
        setError("Không có token đăng nhập");
    }

    const fetchAddressByCustomerId = async (customerId: string): Promise<Address[] | null> => {
        if (!token) {
            setError("Không có token đăng nhập");
            return null;
        }
        setLoading(true);
        setError(null);
        try {
            const response = await getAddressByCustomerId(customerId);
            setAdr(response);
            return response;
        } catch (err: any) {
            setError(err.message || "Lỗi khi lấy địa chỉ");
            return null;
        } finally {
            setLoading(false);
        }
    };


    const fetchCreateAddress = async (
        addressRequest: { note: string; address: string; receiver: string; numberPhone: string; customerId: string }
    ): Promise<AddressRequest | null> => {
        if (!token) {
            setError("Không có token đăng nhập");
            return null;
        }
        setLoading(true);
        setError(null);
        try {
            const response = await createAddress(addressRequest);
            setCreatedAddress(response);
            // Cập nhật lại danh sách địa chỉ khi tạo thành công
            if (addressRequest.customerId) {
                await fetchAddressByCustomerId(addressRequest.customerId);
            }
            return response;
        } catch (err: any) {
            setError(err.message || "Đã xảy ra lỗi");
            return null;
        } finally {
            setLoading(false);
        }
    };

    const fetchDeleteAddress = async (id: string): Promise<boolean> => {
        if (!token) {
            setError("Không có token đăng nhập");
            return false;
        }
        setLoading(true);
        setError(null);
        try {
            await deleteAddress(id);
            await fetchAddressByCustomerId(user?.id ?? "");
            return true;
        } catch (err: any) {
            setError(err.message || "Đã xảy ra lỗi khi xoá");
            return false;
        } finally {
            setLoading(false);
        }
    };

    const fetchUpdateAddress = async (
        id: string,
        updatedAddress: AddressRequest
    ): Promise<AddressRequest | null> => {
        if (!token) {
            setError("Không có token đăng nhập");
            return null;
        }
        setLoading(true);
        setError(null);
        try {
            const response = await updateAddress(id, updatedAddress);
            await fetchAddressByCustomerId(updatedAddress.customerId);
            return response;
        } catch (err: any) {
            setError(err.message || "Đã xảy ra lỗi khi cập nhật");
            return null;
        } finally {
            setLoading(false);
        }
    };

    const fetchTotalAmount = async (
        orderDetails: OrderDetailRequest[],
        discountCode: string
    ): Promise<number | undefined> => {
        return await getTotalAmount(orderDetails, discountCode);
    };


    return {
        fetchCreateAddress,
        fetchDeleteAddress,
        fetchUpdateAddress,
        createdAddress,
        loading,
        error,
        address,
        setAddress,
        fetchAddressByCustomerId,
        adr,
        setAdr,
        fetchTotalAmount,
    };
};

export default useAddress;
