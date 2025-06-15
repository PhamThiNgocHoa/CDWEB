import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {vnpayReturnHandlerGet} from "../../server/api/payment/vnpayReturnHandler.get";

const VNPayReturnPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        vnpayReturnHandlerGet()
            .then((responseMessage) => {
                if (responseMessage === "Payment success") {
                    navigate("/");
                } else {
                    navigate("/");
                }
            })
            .catch((error) => {
                alert("Xác nhận thanh toán thất bại");
                navigate("/");
            });
    }, [navigate]);

    return <div>Đang xử lý kết quả thanh toán...</div>;
};

export default VNPayReturnPage;

