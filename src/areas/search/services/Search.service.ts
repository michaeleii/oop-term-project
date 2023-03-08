import { database } from "../../../model/fakeDB";
import ISearchService from "./ISearchService";
import IUser from "../../../interfaces/user.interface";
import IPost from "../../../interfaces/post.interface";

export class MockSearchService implements ISearchService {
  readonly _db = database;

  async getUser(id: number): Promise<IUser> {
    return this._db.users.find((user) => user.id === id);
  }
  async searchUsers(searchTerm: string): Promise<IUser[]> {
    return this._db.users.filter(
      (user) => user.firstName.toLowerCase().includes(searchTerm) || user.lastName.toLowerCase().includes(searchTerm)
    );
  }
  async searchPosts(searchTerm: string): Promise<IPost[]> {
    return this._db.posts.filter((post) => post.message.toLowerCase().includes(searchTerm));
  }
  async isFollowing(userId: number, followingId: number): Promise<boolean> {
    return this._db.followers.some((f) => f.userId === userId && f.followingId === followingId);
  }
  async followUser(userId: number, followingId: number): Promise<void> {
    this._db.followers.push({
      id: this._db.followers.length + 1,
      userId: userId,
      followingId: followingId,
    });
  }
  async unfollowUser(userId: number, followingId: number): Promise<void> {
    this._db.followers = this._db.followers.filter((f) => f.userId === userId && f.followingId !== followingId);
  }
}
