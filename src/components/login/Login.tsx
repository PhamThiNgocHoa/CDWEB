import React, {useState} from "react";
import useUsers from "../../hooks/useCustomer";
import {useNavigate} from "react-router-dom";

function Login() {
    const {handleLogin} = useUsers();
    const [formData, setFormData] = useState({username: "", password: ""});
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await handleLogin(formData.username, formData.password);
            // Nếu đăng nhập thành công, điều hướng sang trang UserList
            navigate("/userProfile");
        } catch (err) {
            console.error("Login failed:", err);
        }

    };

    return (
        <div>
            <h3>Đăng nhập</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username: </label>
                    <input
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Đăng nhập</button>
            </form>
        </div>
    );
}

export default Login;
