import React, {useState} from 'react';
import {initPasswordReset, resetPassword} from "../../server/api/customers/customer.post";
import {register} from "../../server/api/authentication/auth.post";
import useCustomer from "../../hooks/useCustomer";
import {uploadImage} from "../../server/api/imageUpload/image.post";

const UserProfile = () => {

    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const {fetchUpdateCustomer, user} = useCustomer();

// State cho cập nhật thông tin
    const [editUserId, setEditUserId] = useState<string>();
    const [editFullname, setEditFullname] = useState('');
    const [editEmail, setEditEmail] = useState('');
    const [editPhone, setEditPhone] = useState('');
    const id = user?.id


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

    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const handleImageUpload = async () => {
        if (!selectedImage) {
            setError("No image selected");
            return;
        }
        setLoading(true);
        try {
            const response = await uploadImage(selectedImage);
            if (response && response.data && response.data.url) {
                const uploadedImageUrl = response.data.url;
                console.log('Image uploaded successfully:', uploadedImageUrl);
                setImageUrl(uploadedImageUrl); // Cập nhật URL ảnh
                setMessage("Image uploaded successfully");
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            setError("Error uploading image");
        } finally {
            setLoading(false);
        }
    };


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
    const handleUpdateCustomer = async () => {
        setLoading(true);
        try {
            await fetchUpdateCustomer(editUserId, {
                id: id,              // nếu Customer interface yêu cầu
                fullname: editFullname,
                email: editEmail,
                phone: editPhone,
                username: username,
                password: password,
                // thêm các field khác nếu cần thiết
            });
            setMessage("Cập nhật thông tin thành công!");
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
            {error && <div style={{color: 'red'}}>{error}</div>}
            {message && <div style={{color: 'green'}}>{message}</div>}


            <h2>Update User Info</h2>
            <input
                type="number"
                placeholder="User ID"
                value={id}
                onChange={(e) => setEditUserId((e.target.value))}
            />
            <input
                type="text"
                placeholder="Full Name"
                value={editFullname}
                onChange={(e) => setEditFullname(e.target.value)}
            />
            <input
                type="email"
                placeholder="Email"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
            />
            <input
                type="text"
                placeholder="Phone"
                value={editPhone}
                onChange={(e) => setEditPhone(e.target.value)}
            />
            <button onClick={handleUpdateCustomer} disabled={loading}>
                {loading ? "Updating..." : "Update Info"}
            </button>

            <div>
                <h2>Upload Image</h2>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setSelectedImage(e.target.files?.[0] || null)}
                />
                <button onClick={handleImageUpload} disabled={loading || !selectedImage}>
                    {loading ? "Uploading..." : "Upload Image"}
                </button>

                {/* Display uploaded image */}
                {imageUrl && (
                    <div>
                        <h3>Uploaded Image:</h3>
                        <img src={imageUrl} alt="Uploaded" width="300"/>
                    </div>
                )}
            </div>

        </div>
    );
};

export default UserProfile;
