import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { Category } from 'src/app/interfaces/category';
import { Painting } from 'src/app/interfaces/paintings';
import { SendProductToBasket } from 'src/app/NGXS/basket.action';
import { BasketState } from 'src/app/NGXS/basket.state';
import { GetCategoryNameById } from 'src/app/NGXS/category.action';
import { CategoryState } from 'src/app/NGXS/category.state';
import { SendCategoryIdToState } from 'src/app/NGXS/painting.action';
import { PaintingsState } from 'src/app/NGXS/painting.state';


@Component({
  selector: 'app-painting',
  templateUrl: './painting.component.html',
  styleUrls: ['./painting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaintingComponent implements OnInit, OnDestroy {
  @Input() grid!: boolean;
  paintings$!: Observable<Painting[]>;
  @Select(PaintingsState.paintingsForCategoryId) paintingsForCategoryId$!: Observable<Painting[]>;
  @Select(BasketState.productsIds) productsIds$!: Observable<Set<number>>;
  @Select(CategoryState.categoryName) categoryName$!: Observable<Category[]>;
  @Select(PaintingsState.paintingsSearch) paintingsSearch$!: Observable<Painting[]>;
  @Select(PaintingsState.searchActive) searchActive$!: Observable<boolean>;
  
  subscription = new Subscription;
  categiryId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.subscription.add(this.route.params.subscribe(params => {
      this.categiryId = +params['id'];
      this.store.dispatch(new SendCategoryIdToState(this.categiryId));
      this.store.dispatch(new GetCategoryNameById(this.categiryId));
    }))
    this.createPaintingsList()
   
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  createPaintingsList() {
    this.subscription.add(this.searchActive$.subscribe(active => {
      active ? this.paintings$ = this.paintingsSearch$ : this.paintings$ = this.paintingsForCategoryId$
    }))
  }

  addToBasket(paintingId: number) {
    this.store.dispatch(new SendProductToBasket(paintingId))
  }

  goToDetail(id:number){
    this.router.navigate([`detail/${id}`])
  }

}