import {useEffect, useState} from "react";
import {getAllDiscounts} from "../server/api/admin/admin.get";
import {Discount} from "../models/Discount";
import {createDiscount} from "../server/api/admin/admin.post";
import useCustomer from "./useCustomer";
import {useToken} from "./useToken";
import {updateDiscount} from "../server/api/admin/admin.put";
import {deleteDiscount} from "../server/api/admin/admin.delete";

export const useDiscount = () => {
    const [coupons, setCoupons] = useState<Discount[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);
    const {user} = useCustomer();
    const token = useToken();

    useEffect(() => {
        if (!token) {
            setError("Không có token đăng nhập");
            return;
        }
        setLoading(true);
        setError(null);
        const fetchData = async () => {
            const response = await getAllDiscounts();
            setCoupons(response);
            return response;
        }
        fetchData();
    }, [token, user]);

    const handleAddDiscount = async (discount: Omit<Discount, "id">) => {
        if (!token) {
            setError("Không có token đăng nhập");
            return;
        }
        if (user?.role !== "ADMIN") {
            setError("Bạn không có quyền thực hiện thao tác này");
            return;
        }
        if (
            !discount.code.trim() ||
            discount.percent <= 0 ||
            !discount.startDate ||
            !discount.endDate ||
            new Date(discount.startDate) > new Date(discount.endDate)
        ) {
            setNotification({message: "Vui lòng nhập đầy đủ thông tin hợp lệ.", type: "error"});
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const createdDiscount = await createDiscount(discount);
            const data = await getAllDiscounts();
            setCoupons(data);
            setNotification({message: "Thêm mã giảm giá thành công", type: "success"});
            return createdDiscount;
        } catch (error: any) {
            setError("Lỗi khi thêm mã giảm giá");
            setNotification({message: "Lỗi khi thêm mã giảm giá", type: "error"});
        } finally {
            setLoading(false);
        }
    };


    const saveEdit = async (coupon: Discount): Promise<Discount | null> => {
        if (!token || user?.role !== "ADMIN") {
            setNotification({message: "Bạn không có quyền thực hiện thao tác này", type: "error"});
            return null;
        }

        if (!coupon.code.trim() || coupon.percent <= 0 || !coupon.endDate || new Date(coupon.startDate ?? "") > new Date(coupon.endDate)) {
            setNotification({message: "Vui lòng nhập đầy đủ thông tin hợp lệ.", type: "error"});
            return null;
        }

        try {
            const updatedCoupon = await updateDiscount({
                ...coupon,
                active: coupons.find((c) => c.id === coupon.id)?.active ?? true,
            });

            setCoupons((prev) =>
                prev.map((c) => (c.id === updatedCoupon.id ? updatedCoupon : c))
            );

            setNotification({message: "Cập nhật mã giảm giá thành công", type: "success"});

            return updatedCoupon;
        } catch (error) {
            setNotification({message: "Sửa mã giảm giá thất bại", type: "error"});
            return null;
        }
    };


    const handleDelete = async (code: string) => {
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
            await deleteDiscount(code);
            setCoupons((prev) => prev.filter((c) => c.code !== code));
            setNotification({message: "Xóa mã giảm giá thành công", type: "success"});
        } catch (error) {
            setNotification({message: "Xóa mã giảm giá thất bại", type: "error"});
        }
    };
    return {
        handleAddDiscount,
        coupons,
        setCoupons,
        saveEdit,
        handleDelete,
        notification,
        setNotification,
    }
}
