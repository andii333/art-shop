import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasketWindowComponent } from './shared/components/basket-window/basket-window.component';
import { CategoryComponent } from './components/categories/category.component';
import { HomeComponent } from './components/home/home.component';
import { DetailComponent } from './components/detail/detail.component';

const routes: Routes = [
  { path: "", redirectTo: 'homepage', pathMatch: 'full' },
  { path: "basket/:path", component:BasketWindowComponent },
  { path: "checkout", loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutModule) },
  { path: "about-us", loadChildren: () => import('./about-us/about-us.module').then(m => m.AboutUsModule)  },
  { path: "careers", loadChildren: () => import('./careers/careers.module').then(m => m.CareersModule) },
  { path: "homepage", component: HomeComponent, },
  { path: "category/:id", component: CategoryComponent },
  { path: "detail/:id", component: DetailComponent },
  { path: "blog/:id", loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule) },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {
// preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
