export interface Painting {
    name: string;
    id: number;
    author: string;
    yearMade: number;
    price: number;
    image: string;
    oldPrice?:number;
    discount?:number;
    category: number;
    description:string;
    popularity: string[];
    rating?:number;
    inStock:string;
    delivery:number;
}
