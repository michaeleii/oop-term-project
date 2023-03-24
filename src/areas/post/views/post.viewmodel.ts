import DBClient from "../../../PrismaClient";
import DateFormatter from "../../../helper/DateFormatter";
import IPost from "../../../interfaces/post.interface";
import { CommentViewModel } from "../comment.viewmodel";

export class PostViewModel {
  private readonly _db: DBClient = DBClient.getInstance();
  public id: string;
  public creator: string;
  private profilePic: string;
  public message: string;
  public createdAt: string;
  public comments: CommentViewModel[];
  public commentsCount: number;
  public userLiked: boolean;
  public likesCount: number;
  async init(post: IPost, userId: string) {
    this.id = post.id;
    this.createdAt = DateFormatter.format(post.createdAt);
    this.message = post.message;
    await this.getUser(post.creatorId);
    await this.getProfilePic(post.creatorId);
    await this.getComments();
    await this.getCommentCount(post.id);
    await this.getUserLiked(userId);
    await this.getLikes();
  }
  async getUser(creator: string): Promise<void> {
    const user = await this._db.prisma.user.findUnique({ where: { id: creator } });
    this.creator = user.username;
  }
  async getProfilePic(creator: string): Promise<void> {
    const user = await this._db.prisma.user.findUnique({ where: { id: creator } });
    const firstName = user.firstName;
    const lastName = user.lastName;
    this.profilePic = `https://api.dicebear.com/5.x/initials/svg?seed=${firstName[0]}${lastName[0]}`;
  }
  async getComments(): Promise<void> {
    const comments = await this._db.prisma.comment.findMany({
      where: { postId: this.id },
      orderBy: {
        createdAt: "desc",
      },
    });

    this.comments = await Promise.all(
      comments.map(async (comment) => {
        const commentViewModel = new CommentViewModel();
        await commentViewModel.init(comment);
        return commentViewModel;
      })
    );
  }
  async getCommentCount(postId: string): Promise<void> {
    this.commentsCount = await this._db.prisma.comment.count({ where: { postId: this.id } });
  }
  async getLikes(): Promise<void> {
    this.likesCount = await this._db.prisma.like.count({ where: { postId: this.id } });
  }
  async getUserLiked(userId: string): Promise<void> {
    const like = await this._db.prisma.like.findFirst({ where: { postId: this.id, userId: userId } });
    this.userLiked = like ? true : false;
  }
}
