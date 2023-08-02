import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { ActiveDetails, ActiveReply, GetComments, SendComment, SendReply } from 'src/app/NGXS/blog.action';
import { BlogState } from 'src/app/NGXS/blog.state';
import { Comments } from 'src/app/interfaces/comments';
import { Reply } from 'src/app/interfaces/reply';

@Component({
  selector: 'app-reply-form',
  templateUrl: './reply-form.component.html',
  styleUrls: ['./reply-form.component.scss']
})
export class ReplyFormComponent implements OnInit, OnDestroy {
  @Select(BlogState.getReplies) replies$!: Observable<Reply[]>;
  @Select(BlogState.newReplyId) newReplyId$!: Observable<number>;
  @Select(BlogState.activeReply) activeReply$!: Observable<number>;
  @Select(BlogState.newCommentId) newCommentId$!: Observable<number>;
  @Select(BlogState.getComments) comments$!: Observable<Reply[]>;
  @Input() typeForm!: string;
  subscription = new Subscription;
  postId!: number;
  replyId!: number;
  activeReplyId!: number;
  commentId!: number;
  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    email: ['', [Validators.required, Validators.email]],
    comment: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(1000)]],
    date: [new Date()],
    postId: [this.postId],
    id: [this.replyId],
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private store: Store,
  ) { }

  ngOnInit() {
    this.subscription.add(this.newReplyId$.subscribe(id => this.replyId = id));
    this.subscription.add(this.newCommentId$.subscribe(id => this.commentId = id));
    this.subscription.add(this.route.params.subscribe(params => { this.postId = +params['id'] }));
    this.subscription.add(this.activeReply$.subscribe(id => this.activeReplyId = id))
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  submit() {
    this.form.controls['id'].setValue(this.replyId);
    this.form.controls['date'].setValue(new Date());
    this.form.controls['postId'].setValue(this.postId);
    if (this.typeForm === 'reply') {
      this.store.dispatch(new SendReply(this.form.getRawValue() as Reply))
      this.store.dispatch(new ActiveDetails(true))
    } else {
      const comment: Comments = {
        'id': this.commentId,
        'name': this.form.controls['name'].value as string,
        'email': this.form.controls['email'].value as string,
        'comment': this.form.controls['comment'].value as string,
        'date': new Date(),
        'replyId': this.activeReplyId
      }
      this.store.dispatch(new SendComment(comment))
    }
    this.store.dispatch(new ActiveReply(NaN))
    this.form.reset()
    // this.comments$.subscribe(e => console.log(e))
  }

}
