export const formatToVND = (amount: number): string => {
    return new Intl.NumberFormat('vi-VN').format(amount ) + " VND";
};

export default formatToVND;

