import {Product} from "./Product";

export interface Category{
    id: number;
    name: string;
    img: string;
    products: Product[];
}