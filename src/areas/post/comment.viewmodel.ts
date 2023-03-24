import IComment from "../../interfaces/comment.interface";
import DateFormatter from "../../helper/DateFormatter";
import DBClient from "../../PrismaClient";
export class CommentViewModel {
  private readonly _db: DBClient = DBClient.getInstance();
  id: string;
  postId: string;
  creator: string;
  profilePic: string;
  createdAt: string;
  message: string;
  async init(comment: IComment) {
    this.id = comment.id;
    this.postId = comment.postId;
    this.createdAt = DateFormatter.format(comment.createdAt);
    this.message = comment.message;
    await Promise.all([this.getUser(comment.creatorId), this.getProfilePic(comment.creatorId)]);
  }
  async getUser(creator: string): Promise<void> {
    const { username } = await this._db.prisma.user.findUnique({ where: { id: creator } });
    this.creator = username;
  }
  async getProfilePic(creator: string): Promise<void> {
    const { firstName, lastName } = await this._db.prisma.user.findUnique({ where: { id: creator } });
    this.profilePic = `https://api.dicebear.com/5.x/initials/svg?seed=${firstName[0]}${lastName[0]}`;
  }
}
