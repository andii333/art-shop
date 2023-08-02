import { Question } from "../interfaces/question";
import { Review } from "../interfaces/review";

export class GetProductsReviews {
    static type = '[ReviewsService] get productReviews';
    constructor(public paintingId: number) { }
}

export class GetProductsReviewsSuccess {
    static type = '[ReviewsService] get productReviewsSuccess';
    constructor(public data: Review[]) { }
}

export class GetProductsReviewsFail {
    static type = '[ReviewsService] get productReviewsFail';
    constructor(public err: any) { }
}
export class GetShopsReviews {
    static type = '[ReviewsService] get shopReviews';
}

export class GetShopsReviewsSuccess {
    static type = '[ReviewsService] get shopReviewsSuccess';
    constructor(public data: Review[]) { }
}

export class GetShopsReviewsFail {
    static type = '[ReviewsService] get shopReviewsFail';
    constructor(public err: any) { }
}
export class SendProductReview {
    static type = '[ReviewsService] send productsReviews';
    constructor(public review: Review) { }
}

export class SendProductsReviewSuccess {
    static type = '[ReviewsService] send productsReviewsSuccess';
    constructor(public review: Review) { }
}

export class SendProductsReviewFail {
    static type = '[ReviewsService] send productsReviewsFail';
    constructor(public err: any) { }
}
export class SendQuestion {
    static type = '[ReviewsService] send question';
    constructor(public question: Question) { }
}

export class SendShopsReview {
    static type = '[ReviewsService] send shopsReviews';
    constructor(public review: Review) { }
}

export class SendShopsReviewSuccess {
    static type = '[ReviewsService] send shopsReviewsSuccess';
    constructor(public review: Review) { }
}

export class SendShopsReviewFail {
    static type = '[ReviewsService] send shopsReviewsFail';
    constructor(public err: any) { }
}
