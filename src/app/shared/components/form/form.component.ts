import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { ReviewState } from 'src/app/NGXS/reviews.state';
import { SendProductReview, SendShopsReview } from 'src/app/NGXS/reviews.action';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnInit, OnDestroy {
  @Input() component!: string;
  paintingId!: number;
  form!: FormGroup;
  subscription = new Subscription;
  @Select(ReviewState.loadedSendProductsReviews) loadedSendProductsReviews$!: Observable<boolean>;
  @Select(ReviewState.loadingSendProductsReviews) loadingProductsReviews$!: Observable<boolean>;
  @Select(ReviewState.loadedSendShopsReviews) loadedSendShopsReviews$!: Observable<boolean>;
  @Select(ReviewState.loadingSendShopsReviews) loadingShopsReviews$!: Observable<boolean>;
  constructor(
    private fb: FormBuilder,
    private store: Store,
    private route: ActivatedRoute,
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  ngOnInit(): void {
    if (this.component === 'reviews') {
      this.subscription.add(this.route.params.subscribe(params => { this.paintingId = +params['id'] }));
      this.subscription.add(this.loadedSendProductsReviews$.subscribe(loaded => {
        if (loaded) { this.form.reset({ paintingId: this.paintingId }) }
      }))
    }
    if (this.component === 'aboutUs') {
      this.subscription.add(this.loadedSendShopsReviews$.subscribe(loaded => {
        if (loaded) { this.form.reset({ paintingId: this.paintingId })}
      }))
    }
    this.formBuil();
  }

  formBuil() {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      rating: ['', Validators.required],
      comments: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(1000)]],
      date: [new Date()]
    });
  }

  submit() {
    if (this.component === 'reviews') {
      this.store.dispatch(new SendProductReview(this.form.getRawValue()));
    }
    if (this.component === 'aboutUs') {
      this.store.dispatch(new SendShopsReview(this.form.getRawValue()));
    }
  }
}


