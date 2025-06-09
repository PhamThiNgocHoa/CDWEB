import {Product} from "./Product";

export interface Category {
    id?: string;
    name: string;
    description?: string;
    code?: string;
    products?: Product[];
}
