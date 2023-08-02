import { Painting } from "../interfaces/paintings";
import { Search } from "../interfaces/search";

// ----------------------------------GetAllProducts------------------------------------

export class GetProducts {
    static type = '[PaintingService] get product';
}

export class GetProductsSuccess {
    static type = '[PaintingService] get product success';
    constructor(public paintings: Painting[]) { }
}

export class GetProductsFail {
    static type = '[PaintingService] get product fail';
    constructor(public err: any) { }
}
export class SendPaintingIdToState {
    static type = '[PaintingComponent] send productId';
    constructor(public paintingId: number) { }
}
export class SendSearch {
    static type = '[HeaderComponent] send search';
    constructor(public search: Search) { }
}
export class GetOneProductSuccess {
    static type = '[PaintingService] get product success';
    constructor(public painting: Painting) { }
}

export class SendCategoryIdToState {
    static type = '[PaintingComponent] send categoryId';
    constructor(public categoryId: number) { }
}

export class GetBestsellers {
    static type = '[PaintingService] get bestsellers';
}

export class GetBestsellersSuccess {
    static type = '[PaintingService] get bestsellers success';
    constructor(public data: Painting[]) { }
}

export class GetBestsellersFail {
    static type = '[PaintingService] get bestsellers fail';
    constructor(public err: any) { }
}

export class GetTopRanking {
    static type = '[PaintingService] get topRanking';
}

export class GetTopRankingSuccess {
    static type = '[PaintingService] get topRanking success';
    constructor(public data: Painting[]) { }
}

export class GetTopRankingFail {
    static type = '[PaintingService] get topRanking fail';
    constructor(public err: any) { }
}

export class GetMostPopular {
    static type = '[PaintingService] get mostPopular';
}

export class GetMostPopularSuccess {
    static type = '[PaintingService] get mostPopular success';
    constructor(public data: Painting[]) { }
}

export class GetMostPopularFail {
    static type = '[PaintingService] get mostPopular fail';
    constructor(public err: any) { }
}
