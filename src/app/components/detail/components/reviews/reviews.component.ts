import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { Review } from 'src/app/interfaces/review';
import { ReviewState } from 'src/app/NGXS/reviews.state';
import { GetProductsReviews } from 'src/app/NGXS/reviews.action';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewsComponent implements OnInit, OnDestroy {
  @Select(ReviewState.productsReviews) reviews$!:Observable<Review[]>;
  reviews = 'reviews';
  subscription!:Subscription;
  constructor(
    private route: ActivatedRoute,
    private store:Store,
    ) { }
    ngOnDestroy(): void {
      this.subscription.unsubscribe()
    }
    
    ngOnInit(): void {
      this.subscription = this.route.params.subscribe(params =>{
        this.store.dispatch(new GetProductsReviews(+params['id']))  });
  }

}
