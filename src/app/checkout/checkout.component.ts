import { ChangeDetectionStrategy, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { CheckoutPage, DeleteAllProductFromBasket } from 'src/app/NGXS/basket.action';
import { BasketState } from 'src/app/NGXS/basket.state';
import { fadeIn } from '../animations/fadeIn';
import { Painting } from '../interfaces/paintings';
import { Price } from '../interfaces/price';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  animations: [fadeIn],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckoutComponent implements OnInit, OnDestroy {
  @Select(BasketState.subtotal) subtotal$!: Observable<number>;
  @Select(BasketState.products) productsList$!: Observable<Painting[]>;
  form!: FormGroup;
  subtotal!: number;
  tax!: number;
  shipping!: number;
  date!: Date;
  price!: number;
  totalPrice!: Price;
  dateOfShipping!: number;
  fedexNumber = 0;
  productsList!: Painting[];
  promocodDisabled!: boolean;
  subscription = new Subscription;

  constructor(
    private title: Title, 
    private fb: FormBuilder,
    private router: Router,
    private store:Store
  ) {title.setTitle('Checkout page | Art-Shop')  }
  ngOnInit(): void {
    this.store.dispatch(new CheckoutPage(false));
    this.formBuild();
   this.subscription.add(this.productsList$.subscribe(products => this.productsList = products));
    this.subscription.add(this.subtotal$.subscribe(subtotal => {
      this.date = new Date();
      this.dateOfShipping = this.date.setDate(this.date.getDate() + 7);
      this.subtotal = subtotal;
      this.tax = 0.2 * subtotal;
      this.shipping = 0.1 * subtotal;
      this.price = this.subtotal + this.tax + this.shipping;
      this.totalPrice = {
        subtotal: this.subtotal, tax: this.tax, shipping: this.shipping,
        totalPrice: this.price, dateOfShipping: this.dateOfShipping
      }
    }));
    this.price += 32
  }

  ngOnDestroy(): void {
    this.store.dispatch(new CheckoutPage(true));
    this.subscription.unsubscribe();
  }

  clickFedexDhl() {
    if (this.fedexNumber % 2 === 0) { this.price -= 17 } else {
      this.price += 17
    }
    this.fedexNumber += 1
  }

  formBuild() {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      numberPhone: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(13)]],
      address: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      city: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      country: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      postalCode: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      fedex: [true],
      dhl: [false],
      differentAddress: [false],
      cardNumber: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(16), Validators.maxLength(16)]],
      cardHolder: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      cardDate: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(6), Validators.maxLength(6)]],
      cvc: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(3), Validators.maxLength(3)]],
      notes: ['', Validators.maxLength(1000)],
      privacyPolicy: [false, Validators.requiredTrue],
      noSpam: [false, Validators.requiredTrue],
    });
  }

  addPromoCode(promoCode: HTMLInputElement) {
    if (promoCode.value === 'asd') {
      this.promocodDisabled = true
      this.price = this.price - this.subtotal * 0.1
    }
    this.totalPrice = {
      subtotal: this.subtotal, tax: this.tax, shipping: this.shipping, promoCode: promoCode.value,
      totalPrice: this.price, dateOfShipping: this.dateOfShipping
    }
  }

  sendToFormBank() {
    console.log(this.form.getRawValue(), this.totalPrice, this.productsList );
    alert("Your can see order in console log");
    this.form.reset();
    this.router.navigate(['homepage']);
    alert('Your order successfully send');
    this.store.dispatch(new DeleteAllProductFromBasket);
  }

}
