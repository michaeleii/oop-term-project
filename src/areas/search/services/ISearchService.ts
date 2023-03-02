import IDatabase from "../../../interfaces/database.interface.ts";
import IPost from "../../../interfaces/post.interface";
import IUser from "../../../interfaces/user.interface";

export default interface ISearchService {
  readonly _db: IDatabase;
  searchUsers(searchTerm: string): Promise<IUser[]>;
  searchPosts(searchTerm: string): Promise<IPost[]>;
  followUser(follower: number, following: number): Promise<void>;
  unfollowUser(follower: number, following: number): Promise<void>;
  isFollowing(id: number, followingId: number): Promise<boolean>;
  getUser(id: number): Promise<IUser>;
}
