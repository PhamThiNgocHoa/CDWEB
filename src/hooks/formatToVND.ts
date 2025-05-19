export const formatToVND = (amount: number): string => {
    return new Intl.NumberFormat('vi-VN').format(amount);
};

export default formatToVND;

