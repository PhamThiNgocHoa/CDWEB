// src/hooks/FormLogic.ts
import {useState, useEffect} from "react";
import {checkEmail, checkUsername, register} from "../server/api/authentication/auth.post";
import {exists} from "node:fs";

export const useRegisterForm = () => {
    const [fullname, setFullname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const [isUsernameTaken, setIsUsernameTaken] = useState(false);
    const [isEmailTaken, setIsEmailTaken] = useState(true);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPhoneValid, setIsPhoneValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (username.length >= 2) {
                checkUsername(username)
                    .then((exists: boolean) => {
                        setIsUsernameTaken(exists);
                    })
                    .catch((err) => {
                        setIsUsernameTaken(false);
                    });
            } else {
                setIsUsernameTaken(false);
            }
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [username]);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (email) {
                checkEmail(email)
                    .then((exists: boolean) => {
                        setIsEmailTaken(exists);
                    })
                    .catch((err) => {
                        console.error("Lỗi kiểm tra email:", err);
                        setIsEmailTaken(false);
                    });
            } else {
                setIsEmailTaken(false);
            }
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [email]);

    // Hàm xử lý thay đổi của input
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        if (name === "fullname") setFullname(value);
        if (name === "username") setUsername(value);
        if (name === "email") {
            setEmail(value);
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setIsEmailValid(emailRegex.test(value));
        }
        if (name === "password") {
            setPassword(value);
            const passwordRegex = /^(?=.*[A-Z])(?=.*\W).{8,}$/;
            setIsPasswordValid(passwordRegex.test(value));
        }
        if (name === "phone") {
            setPhone(value);
            const phoneRegex = /^(03|05|07|08|09)[0-9]{8}$|^(01|02)[0-9]{9}$/;
            setIsPhoneValid(phoneRegex.test(value));
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setMessage(null);

        if (!fullname || !username || !email || !password || !phone) {
            setError("Vui lòng điền đầy đủ thông tin.");
            setLoading(false);
            return;
        }

        if (isUsernameTaken) {
            setError("Tên người dùng đã tồn tại.");
            setLoading(false);
            return;
        }

        if (isEmailTaken) {
            setError("Email đã tồn tại.");
            setLoading(false);
            return;
        }

        if (isEmailValid)

            if (!isEmailValid) {
                setError("Email không hợp lệ.");
                setLoading(false);
                return;
            }

        if (!isPhoneValid) {
            setError("Số điện thoại không hợp lệ.");
            setLoading(false);
            return;
        }

        if (!isPasswordValid) {
            setError("Mật khẩu phải có ít nhất 8 ký tự, có chữ hoa và ký tự đặc biệt.");
            setLoading(false);
            return;
        }

        try {
            const result = await register(fullname, username, email, password, phone);
            setMessage("Đăng ký thành công!");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Lỗi không xác định");
        } finally {
            setLoading(false);
        }
    };

    return {
        fullname,
        username,
        email,
        password,
        phone,
        error,
        message,
        loading,
        isUsernameTaken,
        isEmailValid,
        isPhoneValid,
        isPasswordValid,
        handleChange,
        handleRegister,
        isEmailTaken,
    };
};
