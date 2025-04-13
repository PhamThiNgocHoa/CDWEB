import React, { useState } from 'react';
import {initPasswordReset, register, resetPassword} from "../../server/api/customers/customer.post";

const UserProfile = () => {
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    // States for Register Form
    const [fullname, setFullname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');

    // States for Reset Password
    const [resetUsername, setResetUsername] = useState('');
    const [resetCode, setResetCode] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleRegister = async () => {
        setLoading(true);
        try {
            const result = await register(fullname, username, email, password, phone);
            setMessage(`Registration successful: ${result}`);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Unknown error occurred");
        } finally {
            setLoading(false);
        }
    };

    const handleInitPasswordReset = async () => {
        setLoading(true);
        try {
            await initPasswordReset(resetUsername);
            setMessage('Password reset request successful. Please check your email.');
        } catch (err) {
            setError(err instanceof Error ? err.message : "Unknown error occurred");
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async () => {
        setLoading(true);
        try {
            await resetPassword(resetUsername, resetCode, newPassword);
            setMessage('Password reset successful!');
        } catch (err) {
            setError(err instanceof Error ? err.message : "Unknown error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {/* Registration Form */}
            <h2>Register</h2>
            <input
                type="text"
                placeholder="Full Name"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
            />
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input
                type="text"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
            <button onClick={handleRegister} disabled={loading}>
                {loading ? "Registering..." : "Register"}
            </button>

            {/* Password Reset Request Form */}
            <h2>Initiate Password Reset</h2>
            <input
                type="text"
                placeholder="Username"
                value={resetUsername}
                onChange={(e) => setResetUsername(e.target.value)}
            />
            <button onClick={handleInitPasswordReset} disabled={loading}>
                {loading ? "Processing..." : "Request Password Reset"}
            </button>

            {/* Reset Password Form */}
            <h2>Reset Password</h2>
            <input
                type="text"
                placeholder="Username"
                value={resetUsername}
                onChange={(e) => setResetUsername(e.target.value)}
            />
            <input
                type="text"
                placeholder="Reset Code"
                value={resetCode}
                onChange={(e) => setResetCode(e.target.value)}
            />
            <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />
            <button onClick={handleResetPassword} disabled={loading}>
                {loading ? "Resetting..." : "Reset Password"}
            </button>

            {/* Messages */}
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {message && <div style={{ color: 'green' }}>{message}</div>}
        </div>
    );
};

export default UserProfile;
