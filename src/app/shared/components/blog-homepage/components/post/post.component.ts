import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { Post } from 'src/app/interfaces/post';
import { ActivePost } from 'src/app/NGXS/blog.action';
import { ChangeCategoryId } from 'src/app/NGXS/category.action';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostComponent implements OnInit {
  @Input() post$!: Observable<Post>;
  subscription = new Subscription;
  tags!: string[];
  constructor(
    private router: Router,
    private store: Store
  ) { }

  ngOnInit(): void {
    if (this.post$) {
      this.subscription.add(this.post$.subscribe(post => this.tags = post.tags))
    } 
  }

  goToPost(postId: number, categoryId: number) {
    this.store.dispatch(new ChangeCategoryId(categoryId));
    this.store.dispatch(new ActivePost(postId));
    this.router.navigate([`/blog/${categoryId}/blog-details/${postId}`]);
  }
}
