import {BookForm} from "../../../../enums/BookForm";

export interface FilterType {
    category: string;
    price: "asc" | "desc" | "";
    bestSeller: string;
    stock: "low" | "high" | "";
    bookForm: BookForm;
}

