
export class OpenBasket {
    static type = '[HeaderComponent]open basket';
    constructor(public open: boolean) { }
}
export class SendProductToBasket {
    static type = '[BasketComponent] send product';
    constructor(public productId: number) { }
}
export class DeleteProductFromBasket {
    static type = '[BasketComponent] delete product';
    constructor(public productId: number) { }
}
export class DeleteAllProductFromBasket {
    static type = '[BasketComponent] deleteAll product';
}
export class CheckoutPage {
    static type = '[CheckoutComponent] open checkoutPage';
    constructor(public checkoutPage: boolean) { }
}

