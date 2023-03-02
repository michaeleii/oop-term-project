import { database } from "../../../model/fakeDB";
import DateFormatter from "../../../helper/DateFormatter";
import IPost from "../../../interfaces/post.interface";
import ILike from "../../../interfaces/like.interface";
import { CommentViewModel } from "../comment.viewmodel";

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
  public id: number;
  public creator: string;
  public message: string;
  public createdAt: string;
  public comments: CommentViewModel[];
  public commentsCount: number;
  public userLiked: boolean;
  public likesCount: number;

  constructor(post: IPost, userId: number) {
    this.id = post.id;
    this.creator = this.getUser(post.creator);
    this.createdAt = DateFormatter.format(post.createdAt);
    this.message = post.message;
    this.comments = this.getComments();
    this.commentsCount = this.comments.length;
    this.userLiked = this.getUserLiked(userId);
    this.likesCount = this.getLikes().length;
  }
  getUser(creator: number): string {
    return this._db.users.find((user) => user.id === creator).username;
  }
  getComments(): CommentViewModel[] {
    return this._db.comments
      .filter((comment) => comment.postId === this.id)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .map((comment) => new CommentViewModel(comment));
  }
  getLikes(): ILike[] {
    return this._db.likes.filter((like) => like.postId === this.id);
  }
  getUserLiked(userId: number): boolean {
    return this._db.likes.some((like) => like.postId === this.id && like.userId === userId);
  }
}
