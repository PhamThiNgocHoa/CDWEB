import {useState} from "react";
import {Customer} from "../models/Customer";
import {login} from "../server/api/authentication/auth.post";
import {checkUsername, getQuantity, getUser} from "../server/api/customers/customer.get";
import {initPasswordReset, register, resetPassword} from "../server/api/customers/customer.post";
import {ChangePasswordDto} from "../models/ChangePasswordDto";
import {changePassword} from "../server/api/customers/customer.patch";
import {updateCustomer} from "../server/api/customers/customer.put";

function useCustomer() {
    const [users, setUsers] = useState<Customer[]>([]);
    const [user, setUser] = useState<Customer | null>(null);
    const [quantity, setQuantity] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);


    const handleLogin = async (username: string, password: string) => {
        try {
            const userData = await login(username, password);
            setUsers(userData);
            return userData;
        } catch (err) {
            const message = err instanceof Error ? err.message : "Unknown error occurred";
            setError(message);
            throw new Error(message);

        }
    };

    const fetchUser = async () => {
        try {
            const userData = await getUser();
            setUser(userData);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Unknown error occurred";
            setError(message);
            throw new Error(message);

        }
    };

    const fetchQuantity = async (userId: number) => {

        try {
            const data = await getQuantity(userId);
            setQuantity(data);
        } catch (error) {
            const message = error instanceof Error ? error.message : "Unknown error occurred";
            setError(message);
            throw new Error(message);
        }
    };

    const fetchCheckUsername = async (username: string) => {
        try {
           return  await checkUsername(username);
        } catch (error) {
            const message = error instanceof Error ? error.message : "Unknown error occurred";
            setError(message);
            throw new Error(message);

        }
    }

    const fetchRegister = async (fullname: string, username: string, email: string, password: string, phone: string) => {
        try {
            await register(fullname, username, email, password, phone);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Unknown error occurred";
            setError(message);
            throw new Error(message);
        }

    }
    const fetchInitPasswordReset = async (username: string) => {
        try {
            await initPasswordReset(username);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Unknown error occurred";
            setError(message);
            throw new Error(message);
        }
    };


    const fetchResetPassword = async (username: string, resetCode: string, newPassword: string) => {
        try {
            await resetPassword(username, resetCode, newPassword);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Unknown error occurred";
            setError(message);
            throw new Error(message);
        }
    }

    const fetchChangePassword = async (customerId: number, dto: ChangePasswordDto) => {
        try {
            await changePassword(customerId, dto);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Unknown error occurred";
            setError(message);
            throw new Error(message);
        }
    }
    const fetchUpdateCustomer = async (customerId: number, customer: Customer) => {
        try {
            await updateCustomer(customerId, customer);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Unknown error occurred";
            setError(message);
            throw new Error(message);
        }
    }


    return {
        user,
        users,
        error,
        handleLogin,
        // fetchUserData,
        fetchUser,
        fetchQuantity,
        quantity,
        fetchCheckUsername,
        fetchRegister,
        fetchInitPasswordReset,
        fetchResetPassword,
        fetchChangePassword,
        fetchUpdateCustomer

    };
}

export default useCustomer;
