import { State, StateContext, Action, Selector, NgxsOnInit } from '@ngxs/store';
import { Injectable } from '@angular/core';
import {
    GetBestsellers, GetBestsellersFail, GetBestsellersSuccess, GetMostPopular, GetMostPopularFail,
    GetMostPopularSuccess, GetOneProductSuccess, GetProducts, GetProductsFail, GetProductsSuccess, GetTopRanking,
    GetTopRankingFail, GetTopRankingSuccess, SendCategoryIdToState, SendPaintingIdToState, SendSearch
} from './painting.action';
import { Painting } from '../interfaces/paintings';
import { PaintingService } from '../services/painting.service';
import { IdEqualSet, IdEqualPainting } from '../interfaces/id-equal-object';
import { Search } from '../interfaces/search';
import { CategoryState, CategoryStateModel } from 'src/app/NGXS/category.state';
export interface PaintingsStateModel {
    dictionaryCategory: IdEqualSet;
    dictionaryPainting: IdEqualPainting;
    bestsellers: Painting[];
    mostPopular: Painting[];
    topRanking: Painting[];
    categoryId: number;
    paintingId: number;
    paintingIdsSet: Set<number>;
    loading: boolean;
    loaded: boolean;
    search: Search | null;
}

@State<PaintingsStateModel>({
    name: 'paintings',
    defaults: {
        dictionaryCategory: {},
        dictionaryPainting: {},
        bestsellers: [],
        mostPopular: [],
        topRanking: [],
        categoryId: NaN,
        paintingId: NaN,
        paintingIdsSet: new Set,
        loading: false,
        loaded: false,
        search: null
    },
})
@Injectable()
export class PaintingsState implements NgxsOnInit {

    @Selector()
    static loaded(state: PaintingsStateModel): boolean {
        return state.loaded;
    }

    @Selector()
    static loading(state: PaintingsStateModel): boolean {
        return state.loading;
    }

    @Selector()
    static bestsellers(state: PaintingsStateModel): Painting[] {
        return state.bestsellers;
    }
    @Selector()
    static mostPopular(state: PaintingsStateModel): Painting[] {
        return state.mostPopular;
    }
    @Selector()
    static topRainking(state: PaintingsStateModel): Painting[] {
        return state.topRanking;
    }
    @Selector()
    static paintingsForPaintingId(state: PaintingsStateModel): Painting {
        return state.dictionaryPainting[state.paintingId]
    }
    @Selector()
    static paintingsSearch(state: PaintingsStateModel): Painting[] {
        const paintings: Painting[] = [];
        const searchText = state.search?.text.toLocaleLowerCase() as string
        const category = state.search?.category as string
        if (category === '0') {
            const arrayPaintings = Array.from(state.paintingIdsSet)
                .map(id => state.dictionaryPainting[id]);
            arrayPaintings.forEach(painting => {
                if (painting.name.toLocaleLowerCase().includes(searchText)) { paintings.push(painting) }
            })
        } else {
            const arrayPaintings = Array.from(state.dictionaryCategory[+category])
                .map(id => state.dictionaryPainting[id]);
            arrayPaintings.forEach(painting => {
                if (painting.name.toLocaleLowerCase().includes(searchText)) { paintings.push(painting) }
            })
        }
        return paintings
    }

    @Selector()
    static searchActive(state: PaintingsStateModel): boolean {
        if (state.search?.text) { return true } else { return false }
    }
    @Selector()
    static searchText(state: PaintingsStateModel): Search {
        return state.search as Search
    }

    @Selector()
    static paintingsForCategoryId(state: PaintingsStateModel): Painting[] {
        return Array.from(state.dictionaryCategory[state.categoryId])
            .map(id => state.dictionaryPainting[id])
    }

    @Selector()
    static dictionaryCategoryNumber(state: PaintingsStateModel): {[id:number]:number} {
        const dictionaryCategory = state.dictionaryCategory
        const newDictionary: { [id: number]: number } = {}
        for (const key in dictionaryCategory) {
            newDictionary[key]  = dictionaryCategory[key].size
        }
        return newDictionary
    } 

    @Selector()
    static paintings(state: PaintingsStateModel): Painting[] {
        return Array.from(state.paintingIdsSet)
            .map(id => state.dictionaryPainting[id])
    }
    // static paintingForCategoriesId(categoryId: number) {
    //     return createSelector([PaintingsState], (state: PaintingsStateModel): Painting[] => {
    //         return state.paintings.filter(painting => categoryId == painting.id)
    //     })
    // }
    constructor(private paintingService: PaintingService) { }

    ngxsOnInit(ctx: StateContext<PaintingsStateModel>): void {
        ctx.dispatch([new GetProducts(), new GetBestsellers(), new GetMostPopular(), new GetTopRanking()])
    }

    @Action(GetProducts)
    getProduct(ctx: StateContext<PaintingsStateModel>) {
        ctx.patchState({
            loading: true,
            loaded: false,
        });
        this.paintingService.getPaintingsFromServer().subscribe({
            next: response => ctx.dispatch(new GetProductsSuccess(response)),
            error: err => ctx.dispatch(new GetProductsFail(err)),
        });
    }

    @Action(GetProductsSuccess)
    getProductSuccess(ctx: StateContext<PaintingsStateModel>, { paintings }: GetProductsSuccess) {
        if (paintings) {
            const paintingIdsSet: Set<number> = new Set;
            const dictionaryPainting = ctx.getState().dictionaryPainting
            const dictionaryCategory: IdEqualSet = {}
            for (let index = 0; index < paintings.length; index++) {
                paintingIdsSet.add(paintings[index].id);
                dictionaryPainting[paintings[index].id] = paintings[index];
                if (dictionaryCategory[paintings[index].id]) {
                    dictionaryCategory[paintings[index].category].add(paintings[index].id)
                } else {
                    dictionaryCategory[paintings[index].category] = new Set<number>().add(paintings[index].id);
                }
            }
            ctx.patchState({
                loading: false,
                loaded: true,
                paintingIdsSet: paintingIdsSet,
                dictionaryPainting: dictionaryPainting,
                dictionaryCategory: dictionaryCategory,
            });
        }
    }

    @Action(GetProductsFail)
    getProductFail(ctx: StateContext<PaintingsStateModel>, { err }: GetProductsFail) {
        ctx.patchState({ loading: false, loaded: false });
        alert(`The list of products could not be loaded from the server and the following error occurred: ${err}`);
    }

    @Action(SendCategoryIdToState)
    sendCategoryIdToState(ctx: StateContext<PaintingsStateModel>, { categoryId }: SendCategoryIdToState) {
        ctx.patchState({ categoryId: categoryId });
    }

    @Action(SendPaintingIdToState)
    sendPaintingIdToState(ctx: StateContext<PaintingsStateModel>, { paintingId }: SendPaintingIdToState) {
        if (!ctx.getState().paintingIdsSet.has(paintingId)) {
            this.paintingService.getOnePaintingFromServer(paintingId).subscribe({
                next: response => ctx.dispatch(new GetOneProductSuccess(response)),
                error: err => ctx.dispatch(new GetProductsFail(err)),
            });
        }
        ctx.patchState({ paintingId: paintingId });
    }

    @Action(SendSearch)
    sendSearch(ctx: StateContext<PaintingsStateModel>, { search }: SendSearch) {
        ctx.patchState({ search: search });
    }

    @Action(GetOneProductSuccess)
    getOneProductSuccess(ctx: StateContext<PaintingsStateModel>, { painting }: GetOneProductSuccess) {
        if (painting) {
            ctx.getState().paintingIdsSet.add(painting.id);
            const dictionaryCategory = ctx.getState().dictionaryCategory
            dictionaryCategory[painting.category].add(painting.id)
            const dictionaryPainting = ctx.getState().dictionaryPainting
            dictionaryPainting[painting.id] = painting;

            ctx.patchState({
                loading: false,
                loaded: true,
                dictionaryPainting: dictionaryPainting,
                dictionaryCategory: dictionaryCategory
            });
        }
    }

    @Action(GetBestsellers)
    getBestsellers(ctx: StateContext<PaintingsStateModel>) {
        ctx.patchState({
            loading: true,
            loaded: false,
        });
        this.paintingService.getBestsellersFromServer().subscribe({
            next: response => ctx.dispatch(new GetBestsellersSuccess(response)),
            error: err => ctx.dispatch(new GetBestsellersFail(err)),
        });
    }

    @Action(GetBestsellersSuccess)
    getBestsellersSuccess(ctx: StateContext<PaintingsStateModel>, { data }: GetBestsellersSuccess) {
        const dataDictionary: IdEqualPainting = {}
        for (let index = 0; index < data.length; index++) {
            dataDictionary[data[index].id] = data[index];
            ctx.getState().paintingIdsSet.add(data[index].id)
            ctx.getState().dictionaryCategory[data[index].category].add(data[index].id)
        }
        Object.assign((ctx.getState().dictionaryPainting), dataDictionary)

        ctx.patchState({
            loading: false,
            loaded: true,
            bestsellers: data,
        });
    }

    @Action(GetBestsellersFail)
    getBestsellersFail(cxt: StateContext<PaintingsStateModel>, { err }: GetBestsellersFail) {
        cxt.patchState({ loading: false, loaded: false });
        alert(`The list of "Bestsellers" type could not be loaded from the server and the following error occurred: ${err}`);
    }

    @Action(GetMostPopular)
    getMostPopular(ctx: StateContext<PaintingsStateModel>) {
        ctx.patchState({
            loading: true,
            loaded: false,
        });
        this.paintingService.getMostPopularFromServer().subscribe({
            next: response => ctx.dispatch(new GetMostPopularSuccess(response)),
            error: err => ctx.dispatch(new GetMostPopularFail(err)),
        });
    }

    @Action(GetMostPopularSuccess)
    getMostPopularSuccess(ctx: StateContext<PaintingsStateModel>, { data }: GetMostPopularSuccess) {
        const dataDictionary: IdEqualPainting = {}
        for (let index = 0; index < data.length; index++) {
            dataDictionary[data[index].id] = data[index];
            ctx.getState().paintingIdsSet.add(data[index].id)
            ctx.getState().dictionaryCategory[data[index].category].add(data[index].id)
        }
        Object.assign((ctx.getState().dictionaryPainting), dataDictionary)
        ctx.patchState({
            loading: false,
            loaded: true,
            mostPopular: data
        });
    }

    @Action(GetMostPopularFail)
    getMostPopularFail(cxt: StateContext<PaintingsStateModel>, { err }: GetMostPopularFail) {
        cxt.patchState({ loading: false, loaded: false });
        alert(`The list of "Most Popular" type could not be loaded from the server and the following error occurred: ${err}`);
    }

    @Action(GetTopRanking)
    getTopRanking(ctx: StateContext<PaintingsStateModel>) {
        ctx.patchState({
            loading: true,
            loaded: false,
        });
        this.paintingService.getTopRankingFromServer().subscribe({
            next: response => ctx.dispatch(new GetTopRankingSuccess(response)),
            error: err => ctx.dispatch(new GetTopRankingFail(err)),
        });
    }

    @Action(GetTopRankingSuccess)
    getTopRankingSuccess(ctx: StateContext<PaintingsStateModel>, { data }: GetTopRankingSuccess) {
        const dataDictionary: IdEqualPainting = {}
        for (let index = 0; index < data.length; index++) {
            dataDictionary[data[index].id] = data[index];
            ctx.getState().paintingIdsSet.add(data[index].id)
            ctx.getState().dictionaryCategory[data[index].category].add(data[index].id)
        }
        Object.assign((ctx.getState().dictionaryPainting), dataDictionary)
        ctx.patchState({
            loading: false,
            loaded: true,
            topRanking: data
        });
    }

    @Action(GetTopRankingFail)
    getTopRankingFail(ctx: StateContext<PaintingsStateModel>, { err }: GetTopRankingFail) {
        ctx.patchState({ loading: false, loaded: false });
        alert(`The list of "Top Ranking" type could not be loaded from the server and the following error occurred: ${err}`);
    }
}