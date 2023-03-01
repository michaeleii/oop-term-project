import IDatabase from "../../../interfaces/database.interface.ts";
import IPost from "../../../interfaces/post.interface";
import IUser from "../../../interfaces/user.interface";

export default interface ISearchService {
  readonly _db: IDatabase;
  searchUsers(searchTerm: string): IUser[];
  searchPosts(searchTerm: string): IPost[];
}
