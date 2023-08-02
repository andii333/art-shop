import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { TooltipDirective } from './directives/tooltip.directive';
import { NumberPhonePipe } from './pipes/number-phone.pipe';
import { RouterModule } from '@angular/router';
import { BasketOneElementComponent } from './components/basket-one-element/basket-one-element.component';
import { BasketWindowComponent } from './components/basket-window/basket-window.component';
import { BasketComponent } from './components/basket/basket.component';
import { FirstLetterBigPipe } from './pipes/first-letter-big.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StarsComponent } from './components/stars/stars.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormComponent } from './components/form/form.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { RadioBtnComponent } from './components/radio-btn/radio-btn.component';
import { BlogHomepageComponent } from './components/blog-homepage/blog-homepage.component';
import { PostComponent } from './components/blog-homepage/components/post/post.component';
import { SmallPostComponent } from './components/blog-homepage/components/small-post/small-post.component';
@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    TooltipDirective,
    NumberPhonePipe,
    BasketOneElementComponent,
    BasketWindowComponent,
    BasketComponent,
    FirstLetterBigPipe,
    FormComponent,
    StarsComponent,
    CheckboxComponent,
    RadioBtnComponent,
    BlogHomepageComponent,
    PostComponent,
    SmallPostComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    TooltipDirective,
    NumberPhonePipe,
    CommonModule,
    HttpClientModule,
    RouterModule,
    BasketOneElementComponent,
    BasketWindowComponent,
    BasketComponent,
    FirstLetterBigPipe,
    MatSidenavModule,
    FormComponent,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    StarsComponent,
    CheckboxComponent,
    RadioBtnComponent,
    BlogHomepageComponent,
    PostComponent,
    SmallPostComponent
  ]
})
export class SharedModule { }
