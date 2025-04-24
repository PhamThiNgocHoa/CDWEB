export interface Address {
    id: number;
    address: string;
    numberPhone: string;
    receiver: string;
    note?: string;
    customerId: number;
    isDefault: boolean;
}
