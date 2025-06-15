import {useState, useEffect} from "react";
import {getCustomers} from "../server/api/admin/admin.get";
import {addCustomer} from "../server/api/admin/admin.post";
import {updateCustomer} from "../server/api/admin/admin.patch";
import {deleteCustomer} from "../server/api/admin/admin.delete";
import {CustomerRequest} from "../models/request/CustomerRequest";
import {CustomerResponse} from "../models/response/CustomerResponse";

export const useCustomerManagement = (token: string | null, role: string | undefined) => {
    const [customers, setCustomers] = useState<CustomerResponse[]>([]);
    const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);

    const fetchCustomers = async () => {
        if (!token || role !== "ADMIN") return;
        const data = await getCustomers();
        setCustomers(data);
    };

    const addNewCustomer = async (data: CustomerRequest) => {
        try {
            await addCustomer(data);
            await fetchCustomers();
            setNotification({message: "Thêm khách hàng thành công", type: "success"});
        } catch {
            setNotification({message: "Thêm khách hàng thất bại", type: "error"});
        }
    };

    const updateExistingCustomer = async (id: string, data: CustomerRequest): Promise<CustomerResponse | undefined> => {
        try {
            const response = await updateCustomer(id, data);
            await fetchCustomers();
            setNotification({message: "Cập nhật khách hàng thành công", type: "success"});
            return response;
        } catch {
            setNotification({message: "Cập nhật khách hàng thất bại", type: "error"});
        }
    };

    const deleteExistingCustomer = async (id: string) => {
        try {
            await deleteCustomer(id);
            await fetchCustomers();
            setNotification({message: "Xoá khách hàng thành công", type: "success"});
        } catch {
            setNotification({message: "Xoá khách hàng thất bại", type: "error"});
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, [token, role]);

    return {
        customers,
        notification,
        setNotification,
        addNewCustomer,
        updateExistingCustomer,
        deleteExistingCustomer,
    };
};
