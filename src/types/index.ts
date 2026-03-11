export interface Product {
    id: string;
    _id?: string;
    name: string;
    price: string | number;
    rating: string | number;
    image: string;
    images?: string[];
    category: string;
    description?: string;
}
