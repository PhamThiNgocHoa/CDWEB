import {useEffect, useState} from "react";
import {Customer} from "../models/Customer";
import {authenticate, login, register} from "../server/api/authentication/auth.post";
import {getQuantity, getUser} from "../server/api/customers/customer.get";
import {initPasswordReset, resetPassword} from "../server/api/customers/customer.post";
import {ChangePasswordDto} from "../models/ChangePasswordDto";
import {changePassword} from "../server/api/customers/customer.patch";
import {updateCustomer} from "../server/api/customers/customer.put";
import {IntrospectRequest} from "../models/request/IntrospectRequest";
import {CustomerResponse} from "../models/response/CustomerResponse";

function useCustomer() {
    const [users, setUsers] = useState<CustomerResponse[]>([]);
    const [user, setUser] = useState<CustomerResponse | null>(null);
    const [quantity, setQuantity] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [changePass, setChangePass] = useState<ChangePasswordDto>();

    const handleError = (error: unknown) => {
        const message = error instanceof Error ? error.message : "Unknown error occurred";
        setError(message);
        throw new Error(message);
    };

    const handleLogin = async (username: string, password: string) => {
        setLoading(true);
        try {
            const userData = await login(username, password);
            setUsers(userData);
            return userData;
        } catch (err) {
            handleError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                const userData = await getUser();
                setUser(userData);
            } catch (err) {
                handleError(err);
            } finally {
                setLoading(false);
            }
        };
        const token = localStorage.getItem("authToken");
        if (token) {
            fetchUser();
        } else {
            setUser(null);
        }
    }, []);


    const fetchQuantity = async (userId: number) => {
        setLoading(true);
        try {
            const data = await getQuantity(userId);
            setQuantity(data);
        } catch (error) {
            handleError(error);
        } finally {
            setLoading(false);
        }
    };


    const fetchRegister = async (fullname: string, username: string, email: string, password: string, phone: string) => {
        setLoading(true);
        try {
            return await register(fullname, username, email, password, phone);
        } catch (err) {
            handleError(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchInitPasswordReset = async (username: string) => {
        setLoading(true);
        try {
            return await initPasswordReset(username);
        } catch (err) {
            handleError(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchResetPassword = async (username: string | undefined, resetCode: string, newPassword: string) => {
        setLoading(true);
        try {
            return await resetPassword(username, resetCode, newPassword);
        } catch (err) {
            handleError(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchChangePassword = async (customerId: string, dto: ChangePasswordDto) => {
        setLoading(true);
        try {
            return await changePassword(customerId, dto);
        } catch (err) {
            handleError(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchUpdateCustomer = async (customerId: string | undefined, customer: {
        password: string;
        phone: string;
        id: string | undefined;
        fullname: string;
        email: string;
        username: string
    }) => {
        setLoading(true);
        try {
            return await updateCustomer(customerId, customer);
        } catch (err) {
            handleError(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchAuthenticate = async (request: IntrospectRequest) => {
        setLoading(true);
        try {
            return await authenticate(request);
        } catch (err) {
            handleError(err);
        } finally {
            setLoading(false);

        }
    }

    return {
        user,
        users,
        error,
        loading,
        handleLogin,
        fetchQuantity,
        quantity,
        fetchRegister,
        fetchInitPasswordReset,
        fetchResetPassword,
        fetchChangePassword,
        fetchUpdateCustomer,
        fetchAuthenticate,
        changePass,
    };
}

export default useCustomer;
