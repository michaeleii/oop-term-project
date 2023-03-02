import { database } from "../../../model/fakeDB";
import IUser from "../../../interfaces/user.interface";

export class SearchUserViewModel {
  private readonly _db = database;
  id: number;
  firstName: string;
  lastName: string;
  following: boolean;
  constructor(searchedUser: IUser, currentUserId: number) {
    this.id = searchedUser.id;
    this.firstName = searchedUser.firstName;
    this.lastName = searchedUser.lastName;
    this.following = this.isFollowing(currentUserId, this.id);
  }
  isFollowing(follower: number, followed: number): boolean {
    return this._db.followers.some((f) => f.followerId === follower && f.followedId === followed);
  }
}
