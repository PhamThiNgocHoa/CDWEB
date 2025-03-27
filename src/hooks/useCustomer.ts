import {useState} from "react";
import {Customer} from "../models/Customer";
import {checkUsername, getQuantity, getUser, getUsers} from "../server/api/customers/customer.get";
import {login} from "../server/api/customers/customer.post";

function useCustomer() {
    const [users, setUsers] = useState<Customer[]>([]);
    const [user, setUser] = useState<Customer | null>(null);
    const [quantity, setQuantity] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);


    const handleLogin = async (username: string, password: string) => {
        try {
            const userData = await login(username, password);
            setUsers(userData);
            return userData;
        } catch (err: any) {
            setError(err.message);
            throw new Error("Login failed");
        }
    };

    const fetchUserData = async () => {
        try {
            const users = await getUsers();
            console.log("Fetched users:", users);
        } catch (error: any) {
            console.error(error.message);
        }
    };


    const fetchUser = async () => {
        try {
            const userData = await getUser();
            setUser(userData);
        } catch (er: any) {
            setError(er.message);
        }
    };

    const fetchQuantity = async () => {

        try {
            const data = await getQuantity();
            setQuantity(data);
        } catch (error: any) {
            console.error("Error fetching quantity:", error.message);
            setError(error.message);
        }
    };

    const fetchCheckUsername = async (username: string): Promise<boolean> => {
        try {
            const response = await checkUsername(username);
            setUsernameAvailable(response);
            return response;
        } catch (error) {
            setUsernameAvailable(false);
            return false;
        }
    }


    return {
        user,
        users,
        error,
        handleLogin,
        fetchUserData,
        fetchUser,
        fetchQuantity,
        quantity,
        fetchCheckUsername,
        usernameAvailable,
    };
}

export default useCustomer;
