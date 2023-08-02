import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogDetailsComponent } from './components/blog-details/blog-details.component';
import { BlogComponent } from './blog.component';
import { SharedModule } from '../shared/shared.module';
import { ReplyComponent } from './components/reply/reply.component';
import { ReplyFormComponent } from './components/reply-form/reply-form.component';
import { CommentsComponent } from './components/comments/comments.component';
import { BigPostComponent } from './components/big-post/big-post.component';

const routes: Routes = [
  { path: "", component: BlogComponent },
  { path: "blog-details/:id", component: BlogDetailsComponent }
]

@NgModule({
  declarations: [
    BlogComponent,
    BlogDetailsComponent,
    ReplyComponent,
    ReplyFormComponent,
    CommentsComponent,
    BigPostComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class BlogModule { }
