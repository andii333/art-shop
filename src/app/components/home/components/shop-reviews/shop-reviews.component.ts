import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { Review } from 'src/app/interfaces/review';
import { ReviewState } from 'src/app/NGXS/reviews.state';

@Component({
  selector: 'app-shop-reviews',
  templateUrl: './shop-reviews.component.html',
  styleUrls: ['./shop-reviews.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShopReviewsComponent implements OnDestroy {
  @Select(ReviewState.shopsReviews) shopsReviews$!: Observable<Review[]>;
  subscription = new Subscription
  turn(side: string) {
    this.subscription.add(this.shopsReviews$.subscribe(list => {
      if (side === 'left') {
        list.push(list[0]);
        list.shift();
      } else {
        list.unshift(list[list.length - 1]);
        list.pop();
      }
    }))
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
