import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CareersComponent } from './careers.component';

const routes: Routes = [
  { path: "", component: CareersComponent }
]

@NgModule({
  declarations: [
    CareersComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class CareersModule { }
