import IFollower from "../../../interfaces/follower.interface";
import IPost from "../../../interfaces/post.interface";
import DBClient from "../../../PrismaClient";
import IPostService from "./IPostService";

export class PostService implements IPostService {
  readonly _db: DBClient = DBClient.getInstance();
  async addPost(message: string, userId: string): Promise<void> {
    await this._db.prisma.post.create({
      data: {
        message: message,
        creatorId: userId,
      },
    });
  }
  async deletePost(postId: string): Promise<void> {
    await this._db.prisma.comment.deleteMany({
      where: {
        postId,
      },
    });
    await this._db.prisma.like.deleteMany({
      where: {
        postId,
      },
    });
    await this._db.prisma.post.delete({
      where: {
        id: postId,
      },
    });
  }
  async getAllPosts(userId: string): Promise<IPost[]> {
    return await this._db.prisma.post.findMany({
      where: {
        creatorId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
  async getAllPostsByUserFollowers(followers: IFollower[]): Promise<IPost[]> {
    const allFollowersPosts: IPost[] = [];
    for await (const follower of followers) {
      const followersPosts = await this.getAllPosts(follower.followingId);
      allFollowersPosts.push(...followersPosts);
    }
    return allFollowersPosts;
  }
  async getUserFollowers(userId: string): Promise<IFollower[]> {
    return await this._db.prisma.follower.findMany({
      where: {
        userId,
      },
    });
  }
  async sortPosts(): Promise<IPost[]> {
    return await this._db.prisma.post.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });
  }
  async findById(id: string): Promise<IPost> {
    return await this._db.prisma.post.findUnique({
      where: {
        id,
      },
    });
  }
  async likePost(postId: string, userId: string): Promise<void> {
    await this._db.prisma.like.create({
      data: {
        postId,
        userId,
      },
    });
  }
  async unlikePost(postId: string, userId: string): Promise<void> {
    await this._db.prisma.like.delete({
      where: {
        postId_userId: {
          postId,
          userId,
        },
      },
    });
  }
  async addCommentToPost(creatorId: string, message: string, postId: string): Promise<void> {
    await this._db.prisma.comment.create({
      data: {
        creatorId,
        message,
        postId,
      },
    });
  }
}
