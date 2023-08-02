import { NgModule } from '@angular/core';
import { CheckoutComponent } from './checkout.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: "", component: CheckoutComponent }
]

@NgModule({
  declarations: [
    CheckoutComponent,
  ],
  imports: [
  SharedModule,
    RouterModule.forChild(routes),
],
  exports:[RouterModule]
})
export class CheckoutModule { }
