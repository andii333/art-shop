import { State, StateContext, Action, Selector, NgxsOnInit } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Post } from '../interfaces/post';
import {
    ActiveReply, ActivePost, CategoryId, GetCategorysPosts, GetCategorysPostsFail, GetCategorysPostsSuccess,
    GetPosts, GetPostsFail, GetPostsSuccess, GetReplies, SendPost, SendPostFail, SendPostSuccess, SendReply,
    SendComment,
    GetComments,
    ActiveDetails
} from './blog.action';
import { PostService } from '../services/post.service';
import { IdEqualComment, IdEqualPost, IdEqualReply, IdEqualSet } from '../interfaces/id-equal-object';
import { Reply } from '../interfaces/reply';
import { Comments } from '../interfaces/comments';

export interface BlogStateModel {
    loading: boolean;
    loaded: boolean;
    categoryId: number;
    categorysPosts: Post[],
    postsDictionary: IdEqualPost;
    repliesDictionary: IdEqualReply;
    repliesSetDictionary: IdEqualSet;
    commentsDictionary: IdEqualComment;
    commentsSetDictionary: IdEqualSet;
    postIdsSet: Set<number>;
    activePost: number;
    activeReply: number;
    newReplyId: number;
    newCommentId: number;
    detail: boolean;
}

@State<BlogStateModel>({
    name: 'blog',
    defaults: {
        loading: false,
        loaded: false,
        categoryId: NaN,
        categorysPosts: [],
        postsDictionary: {},
        repliesDictionary: {},
        repliesSetDictionary: {},
        commentsDictionary: {},
        commentsSetDictionary: {},
        postIdsSet: new Set(),
        activePost: NaN,
        activeReply: NaN,
        newReplyId: NaN,
        newCommentId: NaN,
        detail: true,
    },
})
@Injectable()
export class BlogState implements NgxsOnInit {

    @Selector()
    static loaded(state: BlogStateModel): boolean {
        return state.loaded;
    }

    @Selector()
    static loading(state: BlogStateModel): boolean {
        return state.loading;
    }

    @Selector()
    static posts(state: BlogStateModel): Post[] {
        return Array.from(state.postIdsSet).map(id => state.postsDictionary[id])
    }

    @Selector()
    static categorysPosts(state: BlogStateModel): Post[] {
        return state.categorysPosts
    }

    @Selector()
    static randomPost(state: BlogStateModel): Post {
        const rundom = Math.floor(Math.random() * state.postIdsSet.size) + 1
        return state.postsDictionary[rundom]
    }
    @Selector()
    static randomPost1(state: BlogStateModel): Post {
        const rundom = Math.floor(Math.random() * state.postIdsSet.size) + 1
        return state.postsDictionary[rundom]
    }
    @Selector()
    static randomPost2(state: BlogStateModel): Post {
        const rundom = Math.floor(Math.random() * state.postIdsSet.size) + 1
        return state.postsDictionary[rundom]
    }

    @Selector()
    static randomPosts(state: BlogStateModel): Post[] {
        const arr = [];
        const rundom = Math.floor(Math.random() * state.postIdsSet.size) + 1
        if (rundom <= state.postIdsSet.size - 2) {
            arr.push(state.postsDictionary[rundom])
            arr.push(state.postsDictionary[rundom + 1])
            arr.push(state.postsDictionary[rundom + 2])
        } else if (rundom === state.postIdsSet.size - 1) {
            arr.push(state.postsDictionary[rundom])
            arr.push(state.postsDictionary[rundom + 1])
            arr.push(state.postsDictionary[1])
        }
        else if (rundom === state.postIdsSet.size) {
            arr.push(state.postsDictionary[rundom])
            arr.push(state.postsDictionary[2])
            arr.push(state.postsDictionary[1])
        }
        return arr
    }

    @Selector()
    static postIds(state: BlogStateModel): Set<number> {
        return state.postIdsSet;
    }

    @Selector()
    static activePost(state: BlogStateModel): Post {
        return state.postsDictionary[state.activePost];
    }

    @Selector()
    static getReplies(state: BlogStateModel): Reply[] {
        const set = state.repliesSetDictionary[state.activePost]
        return Array.from(set).map(id => state.repliesDictionary[id])
    }

    @Selector()
    static getComments(state: BlogStateModel): Comments[] {
        const set = state.commentsSetDictionary[state.activeReply]
        return Array.from(set).map(id => state.commentsDictionary[id])
    }

    @Selector()
    static existComments(state: BlogStateModel): number[] {
       const dictionary = state.commentsSetDictionary
       const emptyArray:number[] = []
        for (const key in dictionary) {
            emptyArray.push(+key)
        }
        return emptyArray
    }

    @Selector()
    static newReplyId(state: BlogStateModel): number {
        return state.newReplyId;
    }
    @Selector()
    static newCommentId(state: BlogStateModel): number {
        return state.newCommentId;
    }

    @Selector()
    static activeReply(state: BlogStateModel): number {
        return state.activeReply;
    }

    @Selector()
    static detail(state: BlogStateModel): boolean {
        return state.detail;
    }
    // ---------------------------------------------------------------------------------
    constructor(private postService: PostService) { }
    ngxsOnInit(ctx: StateContext<any>): void {
        ctx.dispatch(new GetPosts());
        ctx.dispatch(new GetComments());
    }
    // ---------------------------------------------------------------------------------
    @Action(GetPosts)
    getPosts(ctx: StateContext<BlogStateModel>) {
        ctx.patchState({
            loading: true,
            loaded: false,
        });
        this.postService.getPosts().subscribe({
            next: response => ctx.dispatch(new GetPostsSuccess(response)),
            error: err => ctx.dispatch(new GetPostsFail(err)),
        });
    }

    @Action(GetPostsSuccess)
    getPostsSuccess(ctx: StateContext<BlogStateModel>, { posts }: GetPostsSuccess) {
        if (posts) {
            const postDictionary: IdEqualPost = {}
            for (let index = 0; index < posts.length; index++) {
                ctx.getState().postIdsSet.add(posts[index].id);
                postDictionary[posts[index].id] = posts[index];
            }
            ctx.patchState({
                loading: false,
                loaded: true,
                postsDictionary: postDictionary,
            });
        }
    }

    @Action(GetPostsFail)
    getPostsFail(ctx: StateContext<BlogStateModel>, { err }: GetPostsFail) {
        ctx.patchState({ loading: false, loaded: false });
        alert(`The list of posts could not be loaded from the server and the following error occurred: ${err}`);
    }
    @Action(GetCategorysPosts)
    getCategorysPosts(ctx: StateContext<BlogStateModel>) {
        ctx.patchState({
            loading: true,
            loaded: false,
        });
        this.postService.getCategoryPosts(ctx.getState().categoryId).subscribe({
            next: response => ctx.dispatch(new GetCategorysPostsSuccess(response)),
            error: err => ctx.dispatch(new GetCategorysPostsFail(err)),
        });
    }

    @Action(GetCategorysPostsSuccess)
    getCategorysPostsSuccess(ctx: StateContext<BlogStateModel>, { posts }: GetCategorysPostsSuccess) {
        if (posts) {
            ctx.patchState({
                loading: false,
                loaded: true,
                categorysPosts: [...posts]
            });
        }
    }

    @Action(GetCategorysPostsFail)
    getCategorysPostsFail(ctx: StateContext<BlogStateModel>, { err }: GetCategorysPostsFail) {
        ctx.patchState({ loading: false, loaded: false });
        alert(`The list of posts could not be loaded from the server and the following error occurred: ${err}`);
    }

    @Action(SendPost)
    sendPost(ctx: StateContext<BlogStateModel>, { post }: SendPost) {
        ctx.patchState({
            loading: true,
            loaded: false,
        });
        this.postService.sendPost(post).subscribe({
            next: response => ctx.dispatch(new SendPostSuccess(response)),
            error: err => ctx.dispatch(new SendPostFail(err)),
        });
    }

    @Action(SendPostSuccess)
    sendPostSuccess(ctx: StateContext<BlogStateModel>, { post }: SendPostSuccess) {
        if (post) {
            const postDictionary: IdEqualPost = {}
            postDictionary[post.id] = post;
            ctx.getState().postIdsSet.add(post.id)
            Object.assign((ctx.getState().postsDictionary), postDictionary)
            ctx.patchState({
                loading: false,
                loaded: true,
            });
        }
    }

    @Action(SendPostFail)
    sendPostFail(ctx: StateContext<BlogStateModel>, { err }: SendPostFail) {
        ctx.patchState({ loading: false, loaded: false });
        alert(`The post was not sent because the following error occurred:: ${err}`);
    }

    @Action(GetReplies)
    getReplies(ctx: StateContext<BlogStateModel>) {
        const repliesDictionary: IdEqualReply = ctx.getState().repliesDictionary;
        const repliesSetDictionary = ctx.getState().repliesSetDictionary;
        const replies = this.postService.getReplies();
        replies.forEach(reply => {
            repliesDictionary[reply.id] = reply;
            if (repliesSetDictionary[reply.postId]) {
                repliesSetDictionary[reply.postId] = repliesSetDictionary[reply.postId].add(reply.id)
            } else {
                repliesSetDictionary[reply.postId] = new Set<number>().add(reply.id)
            }
        })
        if (Object.keys(repliesDictionary).length === 0) {
            ctx.getState().newReplyId = 1
        } else {
            for (const key in repliesDictionary) { ctx.getState().newReplyId = +key + 1 }
        }
    }


    @Action(SendReply)
    sendReply(ctx: StateContext<BlogStateModel>, { reply }: SendReply) {
        this.postService.sendReply(reply);
        const repliesDictionary = ctx.getState().repliesDictionary;
        repliesDictionary[reply.id] = reply;
        for (const key in repliesDictionary) { ctx.getState().newReplyId = +key + 1 }
        const repliesSetDictionary = ctx.getState().repliesSetDictionary;
        if (repliesSetDictionary[reply.postId]) {
            repliesSetDictionary[reply.postId] = repliesSetDictionary[reply.postId].add(reply.id);
        } else {
            repliesSetDictionary[reply.postId] = new Set<number>().add(reply.id)
        }
        ctx.patchState({ repliesDictionary: repliesDictionary, repliesSetDictionary: repliesSetDictionary });
    }

    @Action(GetComments)
    getComments(ctx: StateContext<BlogStateModel>) {
        const commentsDictionary = ctx.getState().commentsDictionary;
        const commentsSetDictionary = ctx.getState().commentsSetDictionary;
        const comments = this.postService.getComments();
        comments.forEach(comment => {
            commentsDictionary[comment.id] = comment;
            if (commentsSetDictionary[comment.replyId]) {
                commentsSetDictionary[comment.replyId] = commentsSetDictionary[comment.replyId].add(comment.id)
            } else {
                commentsSetDictionary[comment.replyId] = new Set<number>().add(comment.id)
            }
        })
        if (Object.keys(commentsDictionary).length === 0) {
            ctx.getState().newCommentId = 1
        } else {
            for (const key in commentsDictionary) { ctx.getState().newCommentId = +key + 1 }
        }
    }

    @Action(SendComment)
    sendComment(ctx: StateContext<BlogStateModel>, { comment }: SendComment) {
        this.postService.sendComment(comment);
        const commentsDictionary = ctx.getState().commentsDictionary;
        commentsDictionary[comment.id] = comment;
        for (const key in commentsDictionary) { ctx.getState().newCommentId = +key + 1 }
        const commentsSetDictionary = ctx.getState().commentsSetDictionary;
        if (commentsSetDictionary[comment.replyId]) {
            commentsSetDictionary[comment.replyId] = commentsSetDictionary[comment.replyId].add(comment.id)
        } else {
            commentsSetDictionary[comment.replyId] = new Set<number>().add(comment.id)
        }
        ctx.patchState({ commentsDictionary: commentsDictionary, commentsSetDictionary: commentsSetDictionary });
    }

    @Action(CategoryId)
    categoryId(ctx: StateContext<BlogStateModel>, { categoryId }: CategoryId) {
        ctx.patchState({ categoryId: categoryId });
    }

    @Action(ActivePost)
    activePost(ctx: StateContext<BlogStateModel>, { postId }: ActivePost) {
        ctx.patchState({ activePost: postId });
    }
    @Action(ActiveReply)
    activeReply(ctx: StateContext<BlogStateModel>, { replyId }: ActiveReply) {
        ctx.patchState({ activeReply: replyId });
    }
    @Action(ActiveDetails)
    activeDetails(ctx: StateContext<BlogStateModel>, { detail }: ActiveDetails) {
        ctx.patchState({ detail: detail });
    }

}
