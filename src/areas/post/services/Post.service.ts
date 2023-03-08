import IFollower from "../../../interfaces/follower.interface";
import IPost from "../../../interfaces/post.interface";
import DBClient from "../../../PrismaClient";
import IPostService from "./IPostService";

// ❗️ Implement this class much later, once everything works fine with your mock db
export class PostService implements IPostService {
  readonly _db: DBClient = DBClient.getInstance();
  async addPost(message: string, userId: number): Promise<void> {
    await this._db.prisma.post.create({
      data: {
        message: message,
        creatorId: userId,
      },
    });
  }
  async deletePost(postId: number): Promise<void> {
    await this._db.prisma.post.delete({
      where: {
        id: postId,
      },
    });
  }
  async getAllPosts(userId: number): Promise<IPost[]> {
    return await this._db.prisma.post.findMany({
      where: {
        creatorId: userId,
      },
    });
  }
  async getAllPostsByUserFollowers(followers: IFollower[]): Promise<IPost[]> {
    const allFollowersPosts: IPost[] = [];
    await followers.forEach(async (follower) => {
      const followersPosts = await this.getAllPosts(follower.followingId);
      allFollowersPosts.push(...followersPosts);
    });
    return allFollowersPosts;
  }
  async getUserFollowers(userId: number): Promise<IFollower[]> {
    return await this._db.prisma.follower.findMany({
      where: {
        userId: userId,
      },
    });
  }
  async sortPosts(): Promise<IPost[]> {
    return await this._db.prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }
  async findById(id: number): Promise<IPost> {
    return await this._db.prisma.post.findUnique({
      where: {
        id: id,
      },
    });
  }
  async likePost(postId: number, userId: number): Promise<void> {
    await this._db.prisma.like.create({
      data: {
        postId: postId,
        userId: userId,
      },
    });
  }
  async unlikePost(postId: number, userId: number): Promise<void> {
    const like = await this._db.prisma.like.findUnique({
      where: {
        postId_userId: {
          postId: postId,
          userId: userId,
        },
      },
    });

    if (like) {
      await this._db.prisma.like.delete({
        where: {
          id: like.id,
        },
      });
    }
  }
  async addCommentToPost(creatorId: number, message: string, postId: number): Promise<void> {
    await this._db.prisma.comment.create({
      data: {
        creator: creatorId,
        message: message,
        postId: postId,
      },
    });
  }
}
