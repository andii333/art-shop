import { State, StateContext, Action, Selector, NgxsOnInit } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Category } from '../interfaces/category';
import { GetCategories, GetCategoriesFail, GetCategoriesSuccess, GetCategoryNameById } from './category.action';
import { CategoriesService } from '../services/categories.service';
import { IdEqualCategory } from '../interfaces/id-equal-object';

export interface CategoryStateModel {
    categories: Category[];
    categoryId: number;
    categoriesObject: IdEqualCategory;
    loading: boolean;
    loaded: boolean;
}

@State<CategoryStateModel>({
    name: 'category',
    defaults: {
        categories:[],
        categoryId: NaN,
        categoriesObject: {},
        loading: false,
        loaded: false,
    },
})
@Injectable()
export class CategoryState implements NgxsOnInit {

    @Selector()
    static loaded(state: CategoryStateModel): boolean {
        return state.loaded;
    }

    @Selector()
    static loading(state: CategoryStateModel): boolean {
        return state.loading;
    }
    
    @Selector()
    static categories(state: CategoryStateModel): Category[] {
        return state.categories;
    }

    @Selector()
    static categoryName(state: CategoryStateModel): string {
        return state.categoriesObject[state.categoryId];
    }

    @Selector()
    static categoryId(state: CategoryStateModel): number {
        return state.categoryId;
    }
    
    @Selector()
    static categoriesObject(state: CategoryStateModel): IdEqualCategory {
        return state.categoriesObject;
    }
    
    constructor(private categoriesService: CategoriesService) { }

    ngxsOnInit(ctx: StateContext<CategoryStateModel>): void {
        ctx.dispatch(new GetCategories)
    }


    @Action(GetCategories)
    getCategories(ctx: StateContext<CategoryStateModel>) {
        ctx.patchState({
            loading: true,
            loaded: false,
        });
        this.categoriesService.getCategoriesFromServer().subscribe({
            next: response => ctx.dispatch(new GetCategoriesSuccess(response)),
            error: err => ctx.dispatch(new GetCategoriesFail(err)),
        });
    }

    @Action(GetCategoriesSuccess)
    getCategoriesSuccess(ctx: StateContext<CategoryStateModel>, { data }: GetCategoriesSuccess) {
        // -----------make object category id equal category name and array with category ids--------------
        const dataForObj: IdEqualCategory = {};
        for (let index = 0; index < data.length; index++) {
            dataForObj[data[index].id] = data[index].name;
}
        ctx.patchState({
            loading: false,
            loaded: true,
            categoriesObject: dataForObj,
            categories:data,
        })
    }

    @Action(GetCategoriesFail)
    getOrderFromBasketFail(ctx: StateContext<CategoryStateModel>, { err }: GetCategoriesFail) {
        ctx.patchState({ loading: false, loaded: false });
        alert(`The list of categories could not be loaded from the server and the following error occurred: ${err}`);
    }
// -------------------------------------------------------------------------------------------------
    @Action(GetCategoryNameById)
    getCategoryNameById(ctx: StateContext<CategoryStateModel>, { categoryId }:GetCategoryNameById) {
        ctx.patchState({categoryId: categoryId})
    }
}
