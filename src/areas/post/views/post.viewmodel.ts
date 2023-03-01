import { database } from "../../../model/fakeDB";
import DateFormatter from "../../../helper/DateFormatter";
import IComment from "../../../interfaces/comment.interface";
import IPost from "../../../interfaces/post.interface";
import ILike from "../../../interfaces/like.interface";

// The following is an (incomplete) example of what a view model may look like
// The purpose of a view model is to format the incoming data from the database
// into what the ejs page requires specifically.

// For example, you may need to show a date on the ejs page like so:
// Date: Monday, Jan 14, 2021

// The default date format in javascript when you call new Date() looks completely different.
// You could solve this in the view model by changing line 19 to a string, and then having a helper
// method which converts the incoming date from the constructor (of type date) to a string formatted
// date that you store in createdAt.

export class PostViewModel {
  readonly _db = database;
  public postId: number;
  public creator: number;
  public message: string;
  public createdAt: string;
  public comments: IComment[];
  public likes: ILike[];

  constructor(post: IPost) {
    this.postId = post.id;
    this.creator = post.creator;
    this.createdAt = DateFormatter.format(post.createdAt);
    this.message = post.message;
    this.comments = this.getComments();
  }
  getComments(): IComment[] {
    return this._db.comments.filter((comment) => comment.postId === this.postId);
  }
  getLikes(): ILike[] {
    return this._db.likes.filter((like) => like.postId === this.postId);
  }
}
