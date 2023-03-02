import { database } from "../../../model/fakeDB";
import IPost from "../../../interfaces/post.interface";
import IUser from "../../../interfaces/user.interface";

export class SearchPostViewModel {
  private readonly _db = database;
  id: number;
  creatorFirstName: string;
  creatorLastName: string;
  message: string;
  constructor(post: IPost) {
    this.id = post.id;
    this.message = post.message;
    const creator = this.getUser(post.creator);
    this.creatorFirstName = creator.firstName;
    this.creatorLastName = creator.lastName;
  }
  getUser(creator: number): IUser {
    return this._db.users.find((user) => user.id === creator);
  }
}
