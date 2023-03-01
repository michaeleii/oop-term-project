import { database } from "../../../model/fakeDB";
import ISearchService from "./ISearchService";
import IUser from "../../../interfaces/user.interface";
import IPost from "../../../interfaces/post.interface";

export class MockSearchService implements ISearchService {
  readonly _db = database;
  searchUsers(searchTerm: string): IUser[] {
    throw new Error("Method not implemented.");
  }
  searchPosts(searchTerm: string): IPost[] {
    throw new Error("Method not implemented.");
  }
}
