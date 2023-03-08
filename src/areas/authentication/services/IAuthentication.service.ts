// import IPost from "./post.interface";
import IDatabase from "../../../interfaces/database.interface.ts";
import DBClient from "../../../PrismaClient";
import IUser from "../../../interfaces/user.interface";

// ⭐️ Feel free to change this interface in any way you like. It is simply an example...
export interface IAuthenticationService {
  readonly _db: DBClient | IDatabase;
  findUserByEmail(email: String): Promise<IUser>;

  createUser(user: IUser): Promise<IUser>;
  getUserByEmailAndPassword(email: string, password: string): Promise<IUser>;
  getUserById(id: number): Promise<IUser | null>;
}
