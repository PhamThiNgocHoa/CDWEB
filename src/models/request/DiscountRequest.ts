export interface DiscountRequest {
    id: string;
    code: string;
    percent: number;
    startDate?: string;
    endDate: string;
}
