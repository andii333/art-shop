import { Comments } from "./comments";
import { Painting } from "./paintings";
import { Post } from "./post";
import { Reply } from "./reply";

export interface IdEqualPainting {
   [id: number]: Painting
}
export interface IdEqualPost {
   [id: number]: Post
}
export interface IdEqualReply {
   [id: number]: Reply
}
export interface IdEqualComment {
   [id: number]: Comments
}
export interface IdEqualSet {
   [id: number]: Set<number>
}

export interface IdEqualCategory {
  [id: number]: string
}
