import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Post } from 'src/app/interfaces/post';
import { Observable, Subscription } from 'rxjs';
import { Select, Selector, Store } from '@ngxs/store';
import { ChangeCategoryId } from 'src/app/NGXS/category.action';
import { CategoryState } from 'src/app/NGXS/category.state';

@Component({
  selector: 'app-big-post',
  templateUrl: './big-post.component.html',
  styleUrls: ['./big-post.component.scss']
})
export class BigPostComponent implements OnInit, OnDestroy {
  @Input() post$!: Observable<Post>;
  @Select(CategoryState.categoryName) categoryName$!: Observable<string>
  category!: string;
  subscription = new Subscription;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.subscription.add(
      this.post$.subscribe(post => this.store.dispatch(new ChangeCategoryId(post.category)))
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
