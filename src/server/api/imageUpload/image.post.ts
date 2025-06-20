import axios from "axios";

export const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await axios.post("/api/cloudinary/upload", formData, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data.url;
    } catch (error) {
        console.error("Lỗi khi tải lên hình ảnh:", error);
        throw error;
    }
};
