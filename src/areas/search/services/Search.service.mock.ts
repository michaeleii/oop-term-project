import { database } from "../../../model/fakeDB";
import ISearchService from "./ISearchService";
import IUser from "../../../interfaces/user.interface";
import IPost from "../../../interfaces/post.interface";

export class MockSearchService implements ISearchService {
  readonly _db = database;

  async searchUsers(searchTerm: string): Promise<IUser[]> {
    return this._db.users.filter(
      (user) => user.firstName.toLowerCase().includes(searchTerm) || user.lastName.toLowerCase().includes(searchTerm)
    );
  }
  async searchPosts(searchTerm: string): Promise<IPost[]> {
    return this._db.posts.filter((post) => post.message.toLowerCase().includes(searchTerm));
  }
  async isFollowing(personThatIsFollowing: number, personThatIsBeingFollowed: number): Promise<boolean> {
    return this._db.followers.some(
      (f) => f.followerId === personThatIsFollowing && f.followedId === personThatIsBeingFollowed
    );
  }
  async followUser(personThatIsFollowing: number, personThatIsBeingFollowed: number): Promise<void> {
    this._db.followers.push({
      id: this._db.followers.length + 1,
      followerId: personThatIsFollowing,
      followedId: personThatIsBeingFollowed,
    });
  }
  async unfollowUser(personThatIsFollowing: number, personThatIsBeingFollowed: number): Promise<void> {
    this._db.followers = this._db.followers.filter(
      (f) => f.followerId !== personThatIsFollowing && f.followedId !== personThatIsBeingFollowed
    );
  }
}
