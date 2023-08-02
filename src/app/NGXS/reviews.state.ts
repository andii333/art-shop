import { State, StateContext, Action, Selector, NgxsOnInit } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Review } from '../interfaces/review';
import { Question } from '../interfaces/question';
import { ReviewsService } from '../services/reviews.service';
import { GetProductsReviews as GetProductReviews, GetProductsReviewsFail as GetProductReviewsFail, GetProductsReviewsSuccess as GetProductReviewsSuccess, SendQuestion,
    SendProductsReviewFail as SendProductReviewFail, SendProductsReviewSuccess as SendProductReviewSuccess, SendShopsReviewFail as SendShopReviewFail, 
    SendShopsReview as SendShopReview, SendShopsReviewSuccess as SendShopReviewSuccess, GetShopsReviews as GetShopReviews, GetShopsReviewsSuccess as GetShopReviewsSuccess,
     GetShopsReviewsFail as GetShopReviewsFail, 
     SendProductReview} from './reviews.action';

export interface ReviewStateModel {
    actualProductsReviews: Review[];
    actualShopsReviews: Review[];
    questions: Question[];
    reviewsObject: { [paintingId: number]: Review[] };
    loadingSendProductsReview: boolean;
    loadingSendShopsReview: boolean;
    loadedSendProductsReview: boolean;
    loadedSendShopsReview: boolean;
    paintingId: number;
}
@State<ReviewStateModel>({
    name: 'review',
    defaults: {
        actualProductsReviews: [],
        actualShopsReviews: [],
        questions: [],
        reviewsObject: {},
        loadingSendProductsReview: false,
        loadingSendShopsReview: false,
        loadedSendProductsReview: false,
        loadedSendShopsReview: false,
        paintingId: NaN,
    },
})
@Injectable()
export class ReviewState implements NgxsOnInit {

    @Selector()
    static loadingSendProductsReviews(state: ReviewStateModel): boolean {
        return state.loadingSendProductsReview;
    }
    @Selector()
    static loadingSendShopsReviews(state: ReviewStateModel): boolean {
        return state.loadingSendShopsReview;
    }
    @Selector()
    static loadedSendProductsReviews(state: ReviewStateModel): boolean {
        return state.loadedSendProductsReview;
    }
    @Selector()
    static loadedSendShopsReviews(state: ReviewStateModel): boolean {
        return state.loadedSendShopsReview;
    }

    @Selector()
    static productsReviews(state: ReviewStateModel): Review[] {
        return state.actualProductsReviews;
    }
    @Selector()
    static shopsReviews(state: ReviewStateModel): Review[] {
        return state.actualShopsReviews;
    }

    @Selector()
    static questions(state: ReviewStateModel): number {
        return state.questions.length;
    }

    @Selector()
    static countOfReviews(state: ReviewStateModel): number {
        return state.actualProductsReviews.length;
    }

    constructor(private reviewsService: ReviewsService) {}

    ngxsOnInit(ctx: StateContext<ReviewStateModel>): void {
        ctx.dispatch([ new GetShopReviews() ])
    }

    @Action(GetProductReviews)
    getProductsReviews(ctx: StateContext<ReviewStateModel>, { paintingId }: GetProductReviews) {
        ctx.patchState({
            paintingId: paintingId
        });

        const reviewObject = ctx.getState().reviewsObject
        if (Object.hasOwn(reviewObject, paintingId) && paintingId) {
            ctx.patchState({
                actualProductsReviews: reviewObject[paintingId],
            });
        } else {
            this.reviewsService.getProductReviewsForPaintingId(paintingId).subscribe({
                next: response => ctx.dispatch(new GetProductReviewsSuccess(response)),
                error: err => ctx.dispatch(new GetProductReviewsFail(err)),
            });
        }
    }

    @Action(GetProductReviewsSuccess)
    getProductReviewsSuccess(ctx: StateContext<ReviewStateModel>, { data }: GetProductReviewsSuccess) {
        const reviewsObject: { [paintingId: number]: Review[] } = ctx.getState().reviewsObject;
        if (data.length) {
            for (let index = 0; index < data.length; index++) {
                reviewsObject[data[index].paintingId as number] = data;
            }
        } else {
            reviewsObject[ctx.getState().paintingId] = []
        }
        ctx.patchState({
            reviewsObject: reviewsObject,
            actualProductsReviews: data,
        });
    }

    @Action(GetProductReviewsFail)
    getProductsReviewsFail(cxt: StateContext<ReviewStateModel>, { err }: GetProductReviewsFail) {
        alert(`Reviews was not gotten because the following error occurred: ${err.message}`)
    }

    @Action(GetShopReviews)
    getShopsReviews(ctx: StateContext<ReviewStateModel>) {
        this.reviewsService.getShopsReviews().subscribe({
            next: response => ctx.dispatch(new GetShopReviewsSuccess(response)),
            error: err => ctx.dispatch(new GetShopReviewsFail(err)),
        });
    }

    @Action(GetShopReviewsSuccess)
    getShopsReviewsSuccess(ctx: StateContext<ReviewStateModel>, { data }: GetShopReviewsSuccess) {
        ctx.patchState({
            actualShopsReviews: data
        });
    }

    @Action(GetShopReviewsFail)
    getShopsReviewsFail(cxt: StateContext<ReviewStateModel>, { err }: GetShopReviewsFail) {
        alert(`Reviews was not gotten because the following error occurred: ${err.message}`)
    }

    // ------------------------------------Send Reviews---------------------------------

    @Action(SendProductReview)
    sendProductsReview(ctx: StateContext<ReviewStateModel>, { review }: SendProductReview) {
        ctx.patchState({
            loadingSendProductsReview: true,
            loadedSendProductsReview: false,
        });

        this.reviewsService.sendProductReviewToServer(review).subscribe({
            next: response => ctx.dispatch(new SendProductReviewSuccess(response)),
            error: err => ctx.dispatch(new SendProductReviewFail(err)),
        });
    }

    @Action(SendProductReviewSuccess)
    sendProductsReviewSuccess(ctx: StateContext<ReviewStateModel>, { review }: SendProductReviewSuccess) {

        ctx.patchState({
            loadingSendProductsReview: false,
            loadedSendProductsReview: true,
            actualProductsReviews: [...ctx.getState().actualProductsReviews, review],
        });
    }

    @Action(SendProductReviewFail)
    sendProductsReviewFail(ctx: StateContext<ReviewStateModel>, { err }: SendProductReviewFail) {
        ctx.patchState({
            loadingSendProductsReview: false,
            loadedSendProductsReview: false,
        });
        alert(`Review was not sent because the following error occurred: ${err.message}`)
    }

    @Action(SendQuestion)
    sendQuestion(ctx: StateContext<ReviewStateModel>, { question }: SendQuestion) {
        ctx.patchState({ questions: [...ctx.getState().questions, question] });
    }

    @Action(SendShopReview)
    sendShopsReview(ctx: StateContext<ReviewStateModel>, { review }: SendShopReview) {
        ctx.patchState({
            loadingSendShopsReview: true,
            loadedSendShopsReview: false,
        });

        this.reviewsService.sendShopReviewToServer(review).subscribe({
            next: response => ctx.dispatch(new SendShopReviewSuccess(response)),
            error: err => ctx.dispatch(new SendShopReviewFail(err)),
        });
    }

    @Action(SendShopReviewSuccess)
    sendShopsReviewSuccess(ctx: StateContext<ReviewStateModel>, { review }: SendShopReviewSuccess) {

        ctx.patchState({
            loadingSendShopsReview: false,
            loadedSendShopsReview: true,
            actualShopsReviews: [...ctx.getState().actualShopsReviews, review],
        });
    }

    @Action(SendShopReviewFail)
    sendShopsReviewFail(ctx: StateContext<ReviewStateModel>, { err }: SendShopReviewFail) {
        ctx.patchState({
            loadingSendShopsReview: false,
            loadedSendShopsReview: false,
        });
        alert(`Review was not sent because the following error occurred: ${err.message}`)
    }

}
