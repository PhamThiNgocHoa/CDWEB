import ApiService from '../ApiService'; // hoặc import axios từ 'axios'

export const createPayment = async (orderId: string, returnUrl: string) => {
    try {
        const response = await ApiService.post(`/api/payments/create/${orderId}`, {returnUrl}, {}, true);

        if (response && response.url) {
            console.log(response.url);
            return response.url;
        }

        return null;
    } catch (error: any) {
        console.error('Error creating payment:', error);
        throw error;
    }
};

