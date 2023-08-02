import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BestsellersComponent } from './components/home/components/bestsellers/bestsellers.component';
import { TopRankingComponent } from './components/home/components/top-ranking/top-ranking.component';
import { MostPopularComponent } from './components/home/components/most-popular/most-popular.component';
import { ShopComponent } from './components/shop/shop.component';
import { HomeComponent } from './components/home/home.component';
import { CategoryComponent } from './components/categories/category.component';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { NgxsModule } from '@ngxs/store';
import { CategoryState } from './NGXS/category.state';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { BasketState } from './NGXS/basket.state';
import { ReviewState } from './NGXS/reviews.state';
import { PaintingsState } from './NGXS/painting.state';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlogState } from './NGXS/blog.state';
import { ShopReviewsComponent } from './components/home/components/shop-reviews/shop-reviews.component';
import { OnePaintingComponent } from './components/home/components/one-painting/one-painting.component';
import { MatSliderModule } from '@angular/material/slider';
import { DetailComponent } from './components/detail/detail.component';
import { DescriptionsComponent } from './components/detail/components/descriptions/descriptions.component';
import { QuestionsComponent } from './components/detail/components/questions/questions.component';
import { ReviewsComponent } from './components/detail/components/reviews/reviews.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PaintingComponent } from './components/categories/components/painting/painting.component';
@NgModule({
  declarations: [
    AppComponent,
    BestsellersComponent,
    TopRankingComponent,
    MostPopularComponent,
    ShopComponent,
    HomeComponent,
    CategoryComponent,
    ShopReviewsComponent,
    OnePaintingComponent,
    DetailComponent,
    DescriptionsComponent,
    QuestionsComponent,
    ReviewsComponent,
    PaintingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    NgxsModule.forRoot([BasketState, CategoryState, ReviewState, PaintingsState, BlogState]),
    NgxsLoggerPluginModule.forRoot(),
    BrowserAnimationsModule,
    MatSliderModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
