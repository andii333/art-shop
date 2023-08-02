import { ChangeDetectionStrategy, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { debounceTime, distinctUntilChanged, filter, map, Observable, switchMap, takeLast, Subscription } from 'rxjs';
import { CategoryState } from '../../../NGXS/category.state';
import { Category } from '../../../interfaces/category';
import { BasketState } from 'src/app/NGXS/basket.state';
import { headerAnimations } from 'src/app/animations/header-animations';
import { OpenBasket } from 'src/app/NGXS/basket.action';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Painting } from 'src/app/interfaces/paintings';
import { PaintingsState } from 'src/app/NGXS/painting.state';
import { IdEqualPainting } from 'src/app/interfaces/id-equal-object';
import { take } from 'cypress/types/lodash';
import { SendSearch } from 'src/app/NGXS/painting.action';
import { ActivatedRoute, Router } from '@angular/router';
import { Search } from 'src/app/interfaces/search';
import { MatSidenav, MatSidenavContent, MatSidenavModule } from '@angular/material/sidenav';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [headerAnimations],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Select(CategoryState.categories) categories$!: Observable<Category[]>;
  @Select(BasketState.numberOfProductsInBasket) numberOfProducts$!: Observable<number>;
  @Select(BasketState.namesOfProductsInBasket) namesOfProducts$!: Observable<string>;
  @Select(PaintingsState.searchActive) searchActive$!: Observable<boolean>;
  prevRoute!:string;
  form!: FormGroup;
  subscribe = new Subscription;
  showFiller = false;
  bigScreen!: boolean;
  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    window.innerWidth > 769 ? this.bigScreen = true : this.bigScreen = false
  }

  constructor(
    private store: Store,
    private router: Router,
  ) { }
  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }
  ngOnInit(): void {
    this.getScreenSize()
    this.form = new FormGroup({
      text: new FormControl(''),
      category: new FormControl('0')
    })
    this.subscribe.add(this.searchActive$.subscribe(active => {
      if (active) {
        if (this.form.controls['category'].value === '0') {
          this.router.navigate(['/category/*'])
        } else {
          this.router.navigate([`/category/${this.form.controls['category'].value}`])
        }
        this.prevRoute = this.router.url
      }
      if (!active && this.form.touched) {
        this.router.navigate([this.prevRoute])
      }
    }))
  }

  search() {
    this.subscribe.add(this.form.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged())
      .subscribe(search => {
        this.store.dispatch(new SendSearch(search))
      }))
  }

  goToBasket(): void {
    this.store.dispatch(new OpenBasket(true));
  }
}



