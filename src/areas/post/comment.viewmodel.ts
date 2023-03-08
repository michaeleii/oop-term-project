// import { database } from "../../model/fakeDB";
import IComment from "../../interfaces/comment.interface";
import DateFormatter from "../../helper/DateFormatter";
import DBClient from "../../PrismaClient";
export class CommentViewModel {
  private readonly _db: DBClient = DBClient.getInstance();
  id: number;
  postId: number;
  creator: string;
  profilePic: string;
  createdAt: string;
  message: string;

  constructor(comment: IComment) {
    this.id = comment.id;
    this.postId = comment.postId;
    this.getUser(comment.creatorId).then((user) => (this.creator = user));
    this.getProfilePic(comment.creator).then((picURL) => (this.profilePic = picURL));
    this.createdAt = DateFormatter.format(comment.createdAt);
    this.message = comment.message;
  }
  async getUser(creator: number): Promise<string> {
    const user = await this._db.prisma.user.findUnique({ where: { id: creator } });
    return user.username;
  }
  async getProfilePic(creator: number): Promise<string> {
    const { firstName, lastName } = await this._db.prisma.user.findUnique({ where: { id: creator } });
    return `https://api.dicebear.com/5.x/initials/svg?seed=${firstName[0]}${lastName[0]}`;
  }
}
