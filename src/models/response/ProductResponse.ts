import {BookForm} from "../../enums/BookForm";
import {Category} from "../Category";

export interface ProductResponse {
    id: string;
    name: string;
    img: string;
    price: number;
    detail?: string;
    supplier?: string;
    author?: string;
    publishYear?: number;
    publisher?: string;
    language?: string;
    weight?: number;
    size?: string;
    pageNumber?: number;
    form?: BookForm;
    categoryId?: string;
    categoryName?: string;
    discount?: number;

}