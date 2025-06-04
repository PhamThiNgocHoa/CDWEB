import React, {useEffect, useState} from "react";
import {Customer} from "../models/Customer";
import {authenticate, login, register} from "../server/api/authentication/auth.post";
import {getQuantity, getUser} from "../server/api/customers/customer.get";
import {initPasswordReset, resetPassword} from "../server/api/customers/customer.post";
import {ChangePasswordDto} from "../models/ChangePasswordDto";
import {changePassword} from "../server/api/customers/customer.patch";
import {updateCustomer} from "../server/api/customers/customer.put";
import {IntrospectRequest} from "../models/request/IntrospectRequest";
import {CustomerResponse} from "../models/response/CustomerResponse";
import {useNavigate} from "react-router-dom";

function useCustomer() {
    const [users, setUsers] = useState<CustomerResponse[]>([]);
    const [user, setUser] = useState<CustomerResponse | null>(null);
    const [quantity, setQuantity] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [changePass, setChangePass] = useState<ChangePasswordDto>();
    const [formData, setFormData] = useState({username: "", password: ""});
    const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);
    const navigate = useNavigate();


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
            setNotification({message: "Mật khẩu hoặc tên đăng nhập sai", type: "error"});
            handleError(err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await handleLogin(formData.username, formData.password);
            navigate("/home");
        } catch (err) {
            console.error("Login failed:", err);
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
        quantity,
        fetchRegister,
        fetchInitPasswordReset,
        fetchResetPassword,
        fetchChangePassword,
        fetchUpdateCustomer,
        fetchAuthenticate,
        changePass,
        setChangePass,
        setUser,
        handleChange,
        handleSubmit,
        formData,
        notification,
        setNotification
    };
}

export default useCustomer;
