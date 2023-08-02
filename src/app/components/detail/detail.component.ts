import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaintingsState } from 'src/app/NGXS/painting.state';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { SendPaintingIdToState } from 'src/app/NGXS/painting.action';
import { Meta, Title } from '@angular/platform-browser';
import { ReviewState } from 'src/app/NGXS/reviews.state';
import { CategoryState } from 'src/app/NGXS/category.state';
import { IdEqualCategory } from 'src/app/interfaces/id-equal-object';
import { GetProductsReviews } from 'src/app/NGXS/reviews.action';
import { fadeIn } from 'src/app/animations/fadeIn';
import { appearance } from 'src/app/animations/detail-painting-animations';
import { Painting } from 'src/app/interfaces/paintings';
import { GetCategoryNameById } from 'src/app/NGXS/category.action';
import { SendProductToBasket } from 'src/app/NGXS/basket.action';
import { BasketState } from 'src/app/NGXS/basket.state';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  animations: [fadeIn, appearance],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailComponent implements OnInit, OnDestroy {
  @Select(PaintingsState.paintingsForPaintingId) painting$!: Observable<Painting>;
  @Select(ReviewState.countOfReviews) countOfRewiews$!: Observable<Painting>;
  @Select(ReviewState.questions) countOfQuestions$!: Observable<Painting>;
  @Select(CategoryState.categoryName) categoryName$!: Observable<IdEqualCategory>
  @Select(BasketState.productsIds) productsIds$!: Observable<Set<number>>;

  paintingCategory!: number;
  subscription = new Subscription;
  category!: string;
  active = 'description';
  description = 'center';
  reviews = 'right';
  questions = 'right';
  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private title: Title,
    private meta: Meta
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    this.subscription.add(this.route.params.subscribe(params => {
      this.store.dispatch(new SendPaintingIdToState(+params['id']));
      this.store.dispatch(new GetProductsReviews(+params['id']));
    }));
    this.subscription.add(this.painting$.subscribe(painting => {
      if (painting) {
        this.store.dispatch(new GetCategoryNameById(painting.category));
        this.paintingCategory = painting.category;
      }
      this.title.setTitle(`${painting?.name} | Art-Shop`);
      this.meta.updateTag({ name: 'description', content: `${painting?.name}` });
    }));
  }

  activate(name: string) {
    this.active = name;
    if (name === "description") {
      this.description = 'center';
      this.reviews = 'right';
      this.questions = 'right';
    }
    if (name === "reviews") {
      this.description = 'left';
      this.reviews = 'center';
      this.questions = 'right';
    }
    if (name === "questions") {
      this.description = 'left';
      this.reviews = 'left';
      this.questions = 'center';
    }
  }

  addToBasket(paintingId: number) {
    this.store.dispatch(new SendProductToBasket(paintingId))
  }
}
