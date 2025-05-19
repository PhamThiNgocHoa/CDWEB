import { jwtDecode } from "jwt-decode";

interface TokenPayload {
    id: number; // đảm bảo field này đúng với payload backend trả về
    // có thể thêm username, email, role, exp,... nếu cần
}

export const getCurrentUserId = (): number | null => {
    const token = localStorage.getItem("authToken");
    if (!token) return null;

    try {
        const decoded = jwtDecode<TokenPayload>(token);
        return decoded.id || null;
    } catch (error) {
        console.error("Lỗi giải mã token:", error);
        return null;
    }
};
