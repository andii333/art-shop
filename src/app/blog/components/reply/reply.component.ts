import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { ActiveReply } from 'src/app/NGXS/blog.action';
import { BlogState } from 'src/app/NGXS/blog.state';
import { Reply } from 'src/app/interfaces/reply';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.scss']
})
export class ReplyComponent implements OnInit, OnDestroy {
  action!: string;
  replayIdsArray!: number[];
  existComments = true;
  subscription = new Subscription;
  @Select(BlogState.getReplies) replies$!: Observable<Reply[]>;
  @Select(BlogState.activeReply) replyId$!: Observable<number>;
  @Select(BlogState.existComments) replayIdsArray$!: Observable<number[]>;

  constructor(private store: Store) { }

  comment(id: number) {
    this.store.dispatch(new ActiveReply(id))
    this.action = 'comment'
  }

  openComments(id: number) {
    this.store.dispatch(new ActiveReply(id))
    this.action = 'show'
    this.existComments = !this.existComments
  }

  ngOnInit(): void {
    this.subscription.add(this.replayIdsArray$.subscribe(arr => this.replayIdsArray = arr))
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
