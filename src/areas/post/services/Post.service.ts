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
    throw new Error("Method not implemented.");
  }
  async getAllPostsByUserFollowers(followers: IFollower[]): Promise<IPost[]> {
    throw new Error("Method not implemented.");
  }
  async getUserFollowers(userId: number): Promise<IFollower[]> {
    throw new Error("Method not implemented.");
  }
  async sortPosts(): Promise<IPost[]> {
    throw new Error("Method not implemented.");
  }
  async findById(id: number): Promise<IPost> {
    throw new Error("Method not implemented.");
  }
  async likePost(postId: number, userId: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async unlikePost(postId: number, userId: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async addCommentToPost(creator: number, message: string, postId: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
