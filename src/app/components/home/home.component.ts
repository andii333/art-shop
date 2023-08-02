import { ChangeDetectionStrategy, Component, HostListener, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { Category } from 'src/app/interfaces/category';
import { Painting } from 'src/app/interfaces/paintings';
import { Post } from 'src/app/interfaces/post';
import { GetPosts } from 'src/app/NGXS/blog.action';
import { BlogState } from 'src/app/NGXS/blog.state';
import { CategoryState } from 'src/app/NGXS/category.state';
import { PaintingsState } from 'src/app/NGXS/painting.state';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class HomeComponent implements OnInit {
  @Select(CategoryState.categories) categories$!: Observable<Category[]>;
  @Select(PaintingsState.bestsellers) bestsellers$!: Observable<Painting[]>;
  @Select(PaintingsState.mostPopular) mostPopular$!: Observable<Painting[]>;
  @Select(PaintingsState.paintings) paintings$!: Observable<Painting[]>;
  @Select(BlogState.randomPost) randomPost$!: Observable<Post>;
  @Select(BlogState.randomPost1) randomPost1$!: Observable<Post>;
  @Select(BlogState.randomPost2) randomPost2$!: Observable<Post>;
  
  bestsellers: string[] = [];
  subscribe = new Subscription;
  scrWidth!: number;
  constructor(
    private store:Store
  ) { this.getScreenSize() }

  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    if (window.innerWidth >= 1230) { this.scrWidth = 3 }
    else if (window.innerWidth >= 860) { this.scrWidth = 2 }
    else if (window.innerWidth < 860) { this.scrWidth = 1 }
  }

  ngOnInit(): void {
    this.subscribe.add(this.bestsellers$.subscribe(bestsellers => {
        bestsellers.forEach(bestseller => { this.bestsellers.push(bestseller.name) })
      }));

  }

}
