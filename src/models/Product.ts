export interface Product {
    id?: string;
    name: string;
    img: string;
    price: number;
    detail?: string;
    supplier?: string;
    author: string;
    publishYear?: number;
    publisher?: string;
    weight?: number;
    size?: string;
    pageNumber?: number;
    form?: string;
    stock?: number;
    discount?: string;
    categoryId: string;
    categoryName?: string;
    code?: string;
}
