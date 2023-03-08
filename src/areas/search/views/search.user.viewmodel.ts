import DBClient from "../../../PrismaClient";
import IUser from "../../../interfaces/user.interface";

export class SearchUserViewModel {
  private readonly _db: DBClient = DBClient.getInstance();
  id: number;
  firstName: string;
  lastName: string;
  profilePic: string;
  following: boolean;
  constructor() {}
  async init(searchedUser: IUser, currentUserId: number) {
    this.id = searchedUser.id;
    this.firstName = searchedUser.firstName;
    this.lastName = searchedUser.lastName;
    this.profilePic = this.getProfilePic(searchedUser.firstName, searchedUser.lastName);
    this.following = await this.isFollowing(currentUserId, this.id);
  }
  async isFollowing(userId: number, followingId: number): Promise<boolean> {
    const follow = await this._db.prisma.follower.findFirst({
      where: {
        userId: userId,
        followingId: followingId,
      },
    });
    return follow ? true : false;
  }
  getProfilePic(firstName: string, lastName: string): string {
    return `https://api.dicebear.com/5.x/initials/svg?seed=${firstName[0]}${lastName[0]}`;
  }
}
