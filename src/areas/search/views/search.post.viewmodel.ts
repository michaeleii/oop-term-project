// import { database } from "../../../model/fakeDB";
import DBClient from "../../../PrismaClient";
import IPost from "../../../interfaces/post.interface";
import IUser from "../../../interfaces/user.interface";

export class SearchPostViewModel {
  private readonly _db: DBClient = DBClient.getInstance();
  id: number;
  creatorFirstName: string;
  creatorLastName: string;
  message: string;

  async init(post: IPost) {
    this.id = post.id;
    this.message = post.message;
    const creator = await this.getUser(post.creatorId);
    this.creatorFirstName = creator.firstName;
    this.creatorLastName = creator.lastName;
  }
  async getUser(creator: number): Promise<IUser> {
    return await this._db.prisma.user.findUnique({
      where: {
        id: creator,
      },
    });
  }
}
