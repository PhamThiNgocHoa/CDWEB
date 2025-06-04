export interface Discount {
    id: string;
    code: string;
    percent: number;
    startDate?: string;
    endDate: string;
    active?: boolean;
}
