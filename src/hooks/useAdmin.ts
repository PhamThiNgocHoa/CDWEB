import {useEffect, useState} from "react";
import {
    getAllDiscounts,
    getAllOrders,
    getCustomers,
    getOrderRevenue,
    getOrderRevenueAtYear
} from "../server/api/admin/admin.get";
import useCustomer from "./useCustomer";
import {OrderResponse} from "../models/response/OrderResponse";
import {CustomerResponse} from "../models/response/CustomerResponse";
import {MonthlyRevenueResponse} from "../models/response/MonthlyRevenueResponse";
import {RevenueResponse} from "../models/response/RevenueResponse";
import {uploadImage} from "../server/api/imageUpload/image.post";
import {addCategory, addCustomer, createDiscount} from "../server/api/admin/admin.post";
import {useToken} from "./useToken";
import {Category} from "../models/Category";
import useCategory from "./useCategory";
import {updateCategory} from "../server/api/admin/admin.put";
import {CustomerRequest} from "../models/request/CustomerRequest";
import {updateCustomer} from "../server/api/admin/admin.patch";
import {deleteCustomer} from "../server/api/admin/admin.delete";

export const useAdmin = () => {
    const [error, setError] = useState<string | null>(null);
    const {user} = useCustomer();
    const token = useToken();
    const {refreshCategories} = useCategory();
    const [loading, setLoading] = useState(false);
    const [orderAll, setOrderAll] = useState<OrderResponse[]>();
    const [userAll, setUserAll] = useState<CustomerResponse[]>([]);
    const [revenue, setRevenue] = useState<MonthlyRevenueResponse[]>([]);
    const [revenueByDay, setRevenueByDay] = useState<RevenueResponse>();
    const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);


    useEffect(() => {
        const fetchGetAllOrders = async () => {
            if (!token) {
                setError("Không có token đăng nhập");
                return null;
            }
            if (user?.role !== "ADMIN") {
                return;
            }
            setLoading(true);
            setError(null);
            try {
                const data = await getAllOrders();
                setOrderAll(data);

            } catch (error) {
                console.error("Lỗi khi lấy danh sách đơn hàng:", error);
            }
        };
        fetchGetAllOrders();
    }, [user]);

    useEffect(() => {
        const fetchUserAll = async () => {
            if (!token) {
                setError("Không có token đăng nhập");
                return;
            }
            if (user?.role !== "ADMIN") {
                return;
            }
            setLoading(true);

            try {
                const userData = await getCustomers();
                setUserAll(userData);
            } catch (err) {
                console.error("", err);

            } finally {
                setLoading(false);
            }
        };
        fetchUserAll()
    }, [token, user]);

    useEffect(() => {
        const fetchRevenue = async () => {
            if (!token) {
                setError("Không có token đăng nhập");
                return;
            }
            if (user?.role !== "ADMIN") {
                return;
            }
            setLoading(true);

            try {
                const userData = await getOrderRevenue();
                setRevenue(userData);
            } catch (err) {
                console.error("", err);

            } finally {
                setLoading(false);
            }
        };
        fetchRevenue()
    }, [token, user]);

    const fetchOrderRevenueAtYear = async (date: string) => {
        if (!token) {
            setError("Không có token đăng nhập");
            return;
        }
        if (user?.role !== "ADMIN") {
            return;
        }
        setLoading(true);

        try {
            const userData = await getOrderRevenueAtYear(date);
            setRevenueByDay(userData);
        } catch (err) {
            console.error("Lỗi khi gọi API:", err);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (token && user?.role === "ADMIN") {
            const today = new Date();
            const localDate = today.toLocaleDateString('en-CA'); // ISO format "YYYY-MM-DD"
            fetchOrderRevenueAtYear(localDate);
        }
    }, [token, user]);

    const handleUpload = async (file: File) => {
        try {
            const imageUrl = await uploadImage(file);
            console.log("Đường dẫn ảnh:", imageUrl);
        } catch (err) {
            console.error("Lỗi khi upload ảnh", err);
        }
    };

    const handleAddCategory = async (category: Category) => {
        if (!token) {
            setError("Không có token đăng nhập");
            return;
        }

        if (user?.role !== "ADMIN") {
            setError("Bạn không có quyền thực hiện thao tác này");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await addCategory(category);
            await refreshCategories();
            return response;
        } catch (error: any) {
            console.error("Lỗi khi thêm danh mục:", error);
            setError("Không thể thêm danh mục");
        } finally {
            setLoading(false);
        }
    };


    const handleUpdateCategory = async (category: Category) => {
        if (!token) {
            setError("Không có token đăng nhập");
            return;
        }
        if (user?.role !== "ADMIN") {
            setError("Bạn không có quyền thực hiện thao tác này");
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const response = await updateCategory(category);
            await refreshCategories();
            return response;
        } catch (err) {
            setError("Không thể cập nhật danh mục");
        }
    }

    const handleAddCustomer = async (customer: CustomerRequest) => {
        if (!token) {
            setError("Không có token đăng nhập");
            return;
        }
        if (user?.role !== "ADMIN") {
            setError("Bạn không có quyền thực hiện thao tác này");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await addCustomer(customer);
            setNotification({message: "Thêm khách hàng thành công", type: "success"});
            const updatedList = await getCustomers();
            setUserAll(updatedList);
            return response;
        } catch (err) {
            console.error("Lỗi khi thêm khách hàng:", err);
            setError("Không thể thêm khách hàng");
            setNotification({message: "Lỗi khi thêm khách hàng", type: "error"});
            return null;
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateCustomer = async (customerId: string, customer: CustomerRequest) => {
        if (!token) {
            setError("Không có token đăng nhập");
            return;
        }
        if (user?.role !== "ADMIN") {
            setError("Bạn không có quyền thực hiện thao tác này");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await updateCustomer(customerId, customer);
            setNotification({message: "Cập nhật khách hàng thành công", type: "success"});
            const updatedList = await getCustomers();
            setUserAll(updatedList);
            return response;
        } catch (err) {
            console.error("Lỗi khi cập nhật khách hàng:", err);
            setNotification({message: "Lỗi khi cập nhật khách hàng", type: "error"});
            return null;
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteCustomer = async (customerId: string) => {
        if (!token) {
            setError("Không có token đăng nhập");
            return;
        }
        if (user?.role !== "ADMIN") {
            setError("Bạn không có quyền thực hiện thao tác này");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await deleteCustomer(customerId);
            setNotification({message: "Xóa người dùng thành công", type: "success"});
            const updatedList = await getCustomers();
            setUserAll(updatedList);
            return response;
        } catch (err) {
            console.error("Lỗi khi cập nhật khách hàng:", err);
            setNotification({message: "Lỗi khi xóa người dùng", type: "error"});
            return null;
        } finally {
            setLoading(false);
        }
    };


    return {
        orderAll,
        userAll,
        setUserAll,
        revenue,
        revenueByDay,
        handleUpload,
        handleAddCategory,
        handleUpdateCategory,
        notification,
        setNotification,
        handleAddCustomer,
        handleUpdateCustomer,
        handleDeleteCustomer
    }
}
