import { ChangeDetectionStrategy, Component, Input, OnInit, HostListener, OnDestroy } from '@angular/core';
import { interval, map, Observable, startWith, Subscription } from 'rxjs';
import { Painting } from 'src/app/interfaces/paintings';
import { SendProductToBasket } from 'src/app/NGXS/basket.action';
import { Select, Store } from '@ngxs/store';
import { BasketState } from 'src/app/NGXS/basket.state';
import { PaintingsState } from 'src/app/NGXS/painting.state';

@Component({
  selector: 'app-one-painting',
  templateUrl: './one-painting.component.html',
  styleUrls: ['./one-painting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class OnePaintingComponent implements OnInit, OnDestroy {
  @Input() subcategory!: string;
  @Input() numberPaintings!: number;
  @Select(PaintingsState.bestsellers) bestsellers$!: Observable<Painting[]>;
  @Select(PaintingsState.mostPopular) mostPopular$!: Observable<Painting[]>;
  @Select(PaintingsState.topRainking) topRainking$!: Observable<Painting[]>;
  @Select(BasketState.productsIds) productsIds$!: Observable<Set<number>>;
  paintings$!: Observable<Painting[]>;
  subscription = new Subscription;

  scrWidth!: number;
  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    if (window.innerWidth >= 1230) { this.scrWidth = this.numberPaintings }
    else if (window.innerWidth < 769 && this.subcategory === 'top ranking') { this.scrWidth = 1 }
    else if (window.innerWidth < 860) { this.scrWidth = this.numberPaintings - 2 }
    else if (window.innerWidth >= 860) { this.scrWidth = this.numberPaintings - 1 }
  }
  constructor(private store: Store) { }

  ngOnInit(): void {
    this.getScreenSize()
    if (this.subcategory === "bestsellers") {
      let list: Painting[] = [];
      this.subscription.add(this.bestsellers$.subscribe(paintings => {
        list = paintings
      }))
      this.paintings$ = interval(2000)
        .pipe(
          startWith(0),
          map((n) => {
            if (n === list.length) { n = 0 }
            list.push(list[0]);
            list.shift();
            return list;
          })
        )
    } else if (this.subcategory === "top ranking") {
      this.paintings$ = this.topRainking$
    } else if (this.subcategory === "most popular") {
      this.paintings$ = this.mostPopular$
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  addToBasket(paintingId: number) {
    this.store.dispatch(new SendProductToBasket(paintingId))
  }

}
