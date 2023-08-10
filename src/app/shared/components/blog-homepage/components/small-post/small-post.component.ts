import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { fadeIn } from 'src/app/animations/fadeIn';
import { Post } from 'src/app/interfaces/post';
import { ChangeCategoryId } from 'src/app/NGXS/category.action';

@Component({
  selector: 'app-small-post',
  templateUrl: './small-post.component.html',
  styleUrls: ['./small-post.component.scss'],
  animations: [fadeIn],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SmallPostComponent implements OnInit, OnDestroy{
  @Input() post$!: Observable<Post>;
  @Input() posts$!: Observable<Post[]>;
  tags!: string[];
  subscription = new Subscription;
  
  constructor(
    private router: Router,
    private store: Store
  ) { }
  
  ngOnInit(): void {
    if (this.post$) {
      this.subscription.add(this.post$.subscribe(post => this.tags = post.tags))
    }
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  goToPost(postId: number, categoryId: number) {
    this.store.dispatch(new ChangeCategoryId(categoryId));
    this.router.navigate([`/blog/${categoryId}/blog-details/${postId}`])
  }
}
