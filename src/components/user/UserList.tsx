import React from "react";
import { Customer } from "../../models/Customer"; // Make sure Customer type is correct
import useUsers from "../../hooks/useCustomer"; // Ensure path is correct

const UserList = () => {
    const { users, error } = useUsers();

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>User List</h1>
            <ul>
                {users && users.length > 0 ? (
                    users.map((user: Customer) => (
                        // Ensure user.id is unique
                        <li key={user.id}>{user.fullname}</li>
                    ))
                ) : (
                    <li>No users available</li>
                )}
            </ul>
        </div>
    );
};

export default UserList;
