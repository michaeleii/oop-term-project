// import { database } from "../../../model/fakeDB";
// import ILike from "../../../interfaces/like.interface";
import DBClient from "../../../PrismaClient";
import DateFormatter from "../../../helper/DateFormatter";
import IPost from "../../../interfaces/post.interface";
import { CommentViewModel } from "../comment.viewmodel";

export class PostViewModel {
  private readonly _db: DBClient = DBClient.getInstance();
  public id: number;
  public creator: string;
  private profilePic: string;
  public message: string;
  public createdAt: string;
  public comments: CommentViewModel[];
  public commentsCount: number;
  public userLiked: boolean;
  public likesCount: number;

  constructor(post: IPost, userId: number) {
    this.id = post.id;
    this.getUser(post.creatorId).then((user) => (this.creator = user));
    this.getProfilePic(post.creatorId).then((picURL) => (this.profilePic = picURL));
    this.createdAt = DateFormatter.format(post.createdAt);
    this.message = post.message;
    this.getComments().then((comments) => (this.comments = comments));
    this.commentsCount = this.comments.length;
    this.getUserLiked(userId).then((liked) => (this.userLiked = liked));
    this.getLikes().then((count) => (this.likesCount = count));
  }
  async getUser(creator: number): Promise<string> {
    const user = await this._db.prisma.user.findUnique({ where: { id: creator } });
    return user.username;
  }
  async getProfilePic(creator: number): Promise<string> {
    const { firstName, lastName } = await this._db.prisma.user.findUnique({ where: { id: creator } });
    return `https://api.dicebear.com/5.x/initials/svg?seed=${firstName[0]}${lastName[0]}`;
  }
  async getComments(): Promise<CommentViewModel[]> {
    const comments = await this._db.prisma.comment.findMany({ where: { postId: this.id } });
    return comments
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .map((comment) => new CommentViewModel(comment));
  }
  async getLikes(): Promise<number> {
    return await this._db.prisma.like.count({ where: { postId: this.id } });
  }
  async getUserLiked(userId: number): Promise<boolean> {
    const like = await this._db.prisma.like.findFirst({ where: { postId: this.id, userId: userId } });
    return like ? true : false;
  }
}
