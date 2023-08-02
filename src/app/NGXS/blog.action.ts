import { Comments } from "../interfaces/comments";
import { Post } from "../interfaces/post";
import { Reply } from "../interfaces/reply";

export class GetPosts {
    static type = '[PostService] get posts';
}
export class GetPostsSuccess {
    static type = '[PostService] get postsSuccess';
    constructor(public posts: Post[]) { }
}
export class GetPostsFail {
    static type = '[PostService] get postsFail';
    constructor(public err: any) { }
}
export class GetCategorysPosts {
    static type = '[PostService] get categorysPosts';
}
export class GetCategorysPostsSuccess {
    static type = '[PostService] get categorysPostsSuccess';
    constructor(public posts: Post[]) { }
}
export class GetCategorysPostsFail {
    static type = '[PostService] get categorysPostsFail';
    constructor(public err: any) { }
}
export class SendPost {
    static type = '[PostService] send post';
    constructor(public post: Post) { }
}
export class SendPostSuccess {
    static type = '[PostService] send postSuccess';
    constructor(public post: Post) { }
}
export class SendPostFail {
    static type = '[PostService] send postFail';
    constructor(public err: any) { }
}
export class CategoryId {
    static type = '[BlogComponent] send cateoryId';
    constructor(public categoryId: number) { }
}
export class GetReplies {
    static type = '[PostService] get replies';
}
export class SendReply {
    static type = '[ReplyComponent] send reply';
    constructor(public reply: Reply) { }
}
export class GetComments {
    static type = '[PostService] get comments';
}
export class SendComment{
    static type = '[ReplyComponent] send comment';
    constructor(public comment: Comments) { }
}
export class ActivePost {
    static type = '[PostComponent] choose post';
    constructor(public postId: number) { }
}
export class ActiveReply {
    static type = '[ReplyComponent] get replyId';
    constructor(public replyId: number) { }
}
export class ActiveDetails {
    static type = '[BlogDetailComponent] choose details';
    constructor(public detail: boolean) { }
}
