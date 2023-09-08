export interface Product {
    id: number;
    name: string;
    description?: string | null;
    ageRestriction?: number | null;
    company: string;
    price: number;
}