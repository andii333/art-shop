import { Category } from "../interfaces/category";

export class GetCategories {
    static type = '[CategoriesService] get categories';
}

export class GetCategoriesSuccess {
    static type = '[CategoriesService] get categories success';
    constructor(public data: Category[]) { }
}

export class GetCategoriesFail {
    static type = '[CategoriesService] get categories fail';
    constructor(public err: any) { }
}
export class GetCategoryNameById {
    static type = '[PaintingComponent] get categoryName byId';
    constructor(public categoryId: number) { }
}