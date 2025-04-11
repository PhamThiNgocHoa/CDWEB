import React, {useEffect} from 'react';
import useCustomer from "../../hooks/useCustomer";

const UserProfile = () => {
    const {user, error, quantity, fetchUser, fetchQuantity, fetchCheckUsername} = useCustomer();
    const userId = user?.id;
    const username = "hoa";

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    useEffect(() => {
        if (userId) {
            fetchQuantity(userId);
        }
    }, [userId]);

    useEffect(() => {
        const check = async () => {
            if (username) {
                const result = await fetchCheckUsername(username);
                console.log("Username available:", result);
            }
        };

        check();
    }, [username]);



    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div>
                <h2>User Profile</h2>
                <p>Username: {user?.username || "N/A"}</p>
                <p>Full Name: {user?.fullname || "N/A"}</p>
                <p>Email: {user?.email || "N/A"}</p>
                <p>Phone: {user?.phone || "N/A"}</p>
            </div>

            <div>
                <h2>Quantity:</h2>
                <p>{quantity !== null && quantity !== undefined ? quantity : "Loading quantity..."}</p>
            </div>
        </div>
    );
};


export default UserProfile;
