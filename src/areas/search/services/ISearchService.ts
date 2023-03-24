import DBClient from "../../../PrismaClient";
import IDatabase from "../../../interfaces/database.interface.ts";
import IPost from "../../../interfaces/post.interface";
import IUser from "../../../interfaces/user.interface";

export default interface ISearchService {
  readonly _db: DBClient | IDatabase;
  searchUsers(searchTerm: string): Promise<IUser[]>;
  searchPosts(searchTerm: string): Promise<IPost[]>;
  followUser(userId: string, followingId: string): Promise<void>;
  unfollowUser(userId: string, followingId: string): Promise<void>;
  isFollowing(id: string, followingId: string): Promise<boolean>;
  getUser(id: string): Promise<IUser>;
}
