import React, { useEffect } from 'react';
import useCustomer from "../../hooks/useCustomer";

const UserProfile = () => {
    const { user, error, quantity, fetchUser, fetchQuantity, fetchCheckUsername, usernameAvailable  } = useCustomer();
    const username = "hoa";

    useEffect(() => {
        fetchUser();
        fetchQuantity();
        fetchCheckUsername(username);
    }, [fetchUser, fetchQuantity, fetchCheckUsername]);

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
                <p>Username: {user.username}</p>
                <p>Full Name: {user.fullName}</p>
                <p>Email: {user.email}</p>
                <p>Phone: {user.phone}</p>
                <p>Role: {user.role}</p>
            </div>
            <div>
                <h2>Quantity:</h2>
                <p>{quantity !== null ? quantity : "Loading quantity..."}</p>
            </div>

            <div>
                <h2>Username Availability:</h2>
                {/* Hiển thị kết quả kiểm tra tên người dùng */}
                {usernameAvailable === null
                    ? "Checking username..."
                    : usernameAvailable
                        ? "Username is available!"
                        : "Username is taken!"}
            </div>
        </div>
    );
};

export default UserProfile;
