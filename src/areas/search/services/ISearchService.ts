import DBClient from "../../../PrismaClient";
import IDatabase from "../../../interfaces/database.interface.ts";
import IPost from "../../../interfaces/post.interface";
import IUser from "../../../interfaces/user.interface";

export default interface ISearchService {
  readonly _db: DBClient | IDatabase;
  searchUsers(searchTerm: string): Promise<IUser[]>;
  searchPosts(searchTerm: string): Promise<IPost[]>;
  followUser(userId: number, followingId: number): Promise<void>;
  unfollowUser(userId: number, followingId: number): Promise<void>;
  isFollowing(id: number, followingId: number): Promise<boolean>;
  getUser(id: number): Promise<IUser>;
}
