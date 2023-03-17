import ISearchService from "./ISearchService";
import IUser from "../../../interfaces/user.interface";
import IPost from "../../../interfaces/post.interface";
import DBClient from "../../../PrismaClient";

export class SearchService implements ISearchService {
  readonly _db: DBClient = DBClient.getInstance();
  async searchUsers(searchTerm: string): Promise<IUser[]> {
    return await this._db.prisma.user.findMany({
      where: {
        OR: [
          {
            firstName: {
              contains: searchTerm,
            },
          },
          {
            lastName: {
              contains: searchTerm,
            },
          },
        ],
      },
    });
  }
  async searchPosts(searchTerm: string): Promise<IPost[]> {
    return await this._db.prisma.post.findMany({
      where: {
        message: {
          contains: searchTerm,
        },
      },
    });
  }
  async followUser(userId: number, followingId: number): Promise<void> {
    await this._db.prisma.follower.create({
      data: {
        userId: userId,
        followingId: followingId,
      },
    });
  }
  async unfollowUser(userId: number, followingId: number): Promise<void> {
    await this._db.prisma.follower.delete({
      where: {
        userId_followingId: {
          userId: userId,
          followingId: followingId,
        },
      },
    });
  }
  async isFollowing(id: number, followingId: number): Promise<boolean> {
    const follow = await this._db.prisma.follower.findUnique({
      where: {
        userId_followingId: {
          userId: id,
          followingId: followingId,
        },
      },
    });
    return follow ? true : false;
  }
  async getUser(id: number): Promise<IUser> {
    return await this._db.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }
}
