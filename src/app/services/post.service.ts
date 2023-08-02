// import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Post } from '../interfaces/post';
import { DataService } from './data.service';
import { Reply } from '../interfaces/reply';
import { Comments } from '../interfaces/comments';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private dataService: DataService,
    // private httpClient: HttpClient
  ) { }

  getPosts(): Observable<Post[]> {
    // return this.httpClient.get<Post[]>(`http://localhost:3000/posts`)
    return of(this.dataService.posts)
  }

  getCategoryPosts(categoryId: number): Observable<Post[]> {
    // return this.httpClient.get<Post[]>(`http://localhost:3000/posts?category_like=${categoryId}`)
    return of(this.dataService.posts.filter(post => categoryId === post.category))
  }


  sendPost(post: Post): Observable<Post> {
    // return this.httpClient.post<Post>('http://localhost:3000/posts', post, {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json'
    //   })
    // })
    this.dataService.posts.push(post);
    return of(post)
  }

  sendReply(reply: Reply): void {
    this.dataService.replies.push(reply)
  }

  sendComment(comment: Comments): void {
    this.dataService.comments.push(comment)
  }

  getReplies(): Reply[] {
    return this.dataService.replies
  }

  getComments(): Comments[] {
    return this.dataService.comments
  }

}