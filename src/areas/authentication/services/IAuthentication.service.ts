import IDatabase from "../../../interfaces/database.interface.ts";
import DBClient from "../../../PrismaClient";
import IUser from "../../../interfaces/user.interface";

export interface IAuthenticationService {
  readonly _db: DBClient | IDatabase;
  findUserByEmail(email: String): Promise<IUser>;

  createUser(user: IUser): Promise<IUser>;
  getUserByEmailAndPassword(email: string, password: string): Promise<IUser>;
  getUserById(id: string): Promise<IUser | null>;
}
