import { database } from "../../../model/fakeDB";
import ISearchService from "./ISearchService";
import IUser from "../../../interfaces/user.interface";
import IPost from "../../../interfaces/post.interface";

export class MockSearchService implements ISearchService {
  readonly _db = database;
  searchUsers(searchTerm: string): IUser[] {
    return this._db.users.filter(
      (user) => user.firstName.toLowerCase().includes(searchTerm) || user.lastName.toLowerCase().includes(searchTerm)
    );
  }
  searchPosts(searchTerm: string): IPost[] {
    return this._db.posts.filter((post) => post.message.toLowerCase().includes(searchTerm));
  }
}
