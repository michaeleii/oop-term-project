import { database } from "../../../model/fakeDB";
import IUser from "../../../interfaces/user.interface";

export class SearchUserViewModel {
  private readonly _db = database;
  id: number;
  firstName: string;
  lastName: string;
  profilePic: string;
  following: boolean;
  constructor(searchedUser: IUser, currentUserId: number) {
    this.id = searchedUser.id;
    this.firstName = searchedUser.firstName;
    this.lastName = searchedUser.lastName;
    this.profilePic = this.getProfilePic(searchedUser.firstName, searchedUser.lastName);
    this.following = this.isFollowing(currentUserId, this.id);
  }
  isFollowing(userId: number, followingId: number): boolean {
    return this._db.followers.some((f) => f.userId === userId && f.followingId === followingId);
  }
  getProfilePic(firstName: string, lastName: string): string {
    return `https://api.dicebear.com/5.x/initials/svg?seed=${firstName[0]}${lastName[0]}`;
  }
}
