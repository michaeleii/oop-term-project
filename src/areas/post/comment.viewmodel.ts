import { database } from "../../model/fakeDB";
import IComment from "../../interfaces/comment.interface";
import DateFormatter from "../../helper/DateFormatter";

// The following is an (incomplete) example of what a view model may look like
// The purpose of a view model is to format the incoming data from the database
// into what the ejs page requires specifically.

// Please feel free to change this in any way you like.
export class CommentViewModel {
  private readonly _db = database;
  id: number;
  postId: number;
  creator: string;
  profilePic: string;
  createdAt: string;
  message: string;

  constructor(comment: IComment) {
    this.id = comment.id;
    this.postId = comment.postId;
    this.creator = this.getUser(comment.creator);
    this.createdAt = DateFormatter.format(comment.createdAt);
    this.message = comment.message;
  }
  getUser(creator: number): string {
    return this._db.users.find((user) => user.id === creator).username;
  }
}
