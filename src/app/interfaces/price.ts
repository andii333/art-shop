export interface Price {
    subtotal:number;
    tax:number;
    shipping:number;
    promoCode?:string;
    totalPrice:number;
    dateOfShipping: number;
}
