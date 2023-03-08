import IUser from "../../../interfaces/user.interface";
import { IAuthenticationService } from "./IAuthentication.service";
import DBClient from "../../../PrismaClient";
import EmailAlreadyExistsException from "../../../exceptions/EmailAlreadyExists";

// ❗️ Implement this class much later, once everything works fine with your mock db
export class AuthenticationService implements IAuthenticationService {
  // ⭐️ _db should be a reference to your real database driver
  readonly _db: DBClient = DBClient.getInstance();

  async findUserByEmail(email: string): Promise<IUser> {
    return await this._db.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }
  async getUserById(id: number): Promise<IUser | null> {
    let user = await this._db.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    if (user) {
      return user;
    } else {
      throw new Error("User with that id does not exists");
    }
  }
  async getUserByEmailAndPassword(email: string, password: string): Promise<IUser> {
    let user = await this.findUserByEmail(email);

    if (!user) {
      throw new Error("User with that email does not exists");
    }
    if (user) {
      const correctPassword = user.password === password;
      if (correctPassword) {
        return user;
      } else {
        throw new Error("Incorrect password");
      }
    }
  }
  async createUser(user: IUser): Promise<IUser> {
    const { username, firstName, lastName, email, password } = user;
    const userAlreadyExists = await this.findUserByEmail(email);
    if (userAlreadyExists) {
      throw new EmailAlreadyExistsException(email);
    } else {
      await this._db.prisma.user.create({
        data: {
          username,
          firstName,
          lastName,
          email,
          password,
        },
      });
      return await this.findUserByEmail(email);
    }
  }
}
