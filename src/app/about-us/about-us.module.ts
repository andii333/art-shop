import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us.component';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  { path: "", component: AboutUsComponent },
]

@NgModule({
  declarations: [
    AboutUsComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AboutUsModule { }
