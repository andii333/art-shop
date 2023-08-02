import { State, StateContext, Action, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { CheckoutPage, DeleteAllProductFromBasket, DeleteProductFromBasket, OpenBasket, SendProductToBasket } from './basket.action';
import { Painting } from '../interfaces/paintings';
import { PaintingsState, PaintingsStateModel } from 'src/app/NGXS/painting.state';

export interface BasketStateModel {
    productsIdsSet: Set<number>;
    open:boolean;
    loading: boolean;
    loaded: boolean;
    checkoutPage:boolean;
}

@State<BasketStateModel>({
    name: 'basket',
    defaults: {
        productsIdsSet: new Set(),
        open:false,
        loading: false,
        loaded: false,
        checkoutPage:true
    },
})
@Injectable()
export class BasketState {

    @Selector()
    static open(state: BasketStateModel): boolean {
        return state.open;
    }
    @Selector()
    static checkoutPage(state: BasketStateModel): boolean {
        return state.checkoutPage;
    }

    @Selector()
    static loaded(state: BasketStateModel): boolean {
        return state.loaded;
    }

    @Selector()
    static loading(state: BasketStateModel): boolean {
        return state.loading;
    }

    @Selector([PaintingsState])
    static products(state: BasketStateModel, paintingsState: PaintingsStateModel):Painting[] {
        return Array.from(state.productsIdsSet).map(id => paintingsState.dictionaryPainting[id])
    }
    @Selector()
    static productsIds(state: BasketStateModel): Set<number> {
        return state.productsIdsSet;
    }
    @Selector()
    static numberOfProductsInBasket(state: BasketStateModel): number {
        return state.productsIdsSet.size;
    }
    @Selector([PaintingsState])
    static subtotal(state: BasketStateModel, paintingsState: PaintingsStateModel): number {
        const products = Array.from(state.productsIdsSet).map(id => paintingsState.dictionaryPainting[id])
        const emptyArray: number[] = [];
        products.forEach(product => {
            emptyArray.push(product.price);
        })
        return emptyArray.reduce((a, b) => { return a + b }, 0)
    }
    @Selector([PaintingsState])
    static namesOfProductsInBasket(state: BasketStateModel, paintingsState: PaintingsStateModel): string {
        const products = Array.from(state.productsIdsSet).map(id => paintingsState.dictionaryPainting[id])
        const emptyArray: string[] = [];
        products.forEach(product => { emptyArray.push(product.name) });
        let namesOfProductsInBasket = ''
        if (emptyArray.length) {
            namesOfProductsInBasket = (`In your basket are next products: ${emptyArray.join(' , ')}`)
        } else {
            namesOfProductsInBasket = 'Basket is empty'
        }
        return namesOfProductsInBasket
    }


    @Action(OpenBasket)
    openBasket(ctx: StateContext<BasketStateModel>, { open }: OpenBasket) {
        ctx.patchState({
            open: open
        })
    }
    @Action(SendProductToBasket)
    sendProductToBasket(ctx: StateContext<BasketStateModel>, { productId }: SendProductToBasket) {
        ctx.patchState({
            productsIdsSet: new Set([...ctx.getState().productsIdsSet, productId])
        })
    }
    @Action(DeleteProductFromBasket)
    deleteProductFromBasket(ctx: StateContext<BasketStateModel>, { productId }: DeleteProductFromBasket) {
        const productsIds = new Set ([...ctx.getState().productsIdsSet]) 
        productsIds.delete(productId)
        ctx.patchState({
            productsIdsSet: productsIds
        })
    }
    @Action(DeleteAllProductFromBasket)
    deleteAllProductFromBasket(ctx: StateContext<BasketStateModel>) {
        ctx.patchState({
            productsIdsSet: new Set()
        })
    }
    @Action(CheckoutPage)
    checkoutPage(ctx: StateContext<BasketStateModel>, { checkoutPage}: CheckoutPage ) {
        ctx.patchState({
            checkoutPage: checkoutPage
        })
    }

}
