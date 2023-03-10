import { database } from "../../../model/fakeDB";
import IUser from "../../../interfaces/user.interface";
import { IAuthenticationService } from "./IAuthentication.service";
import EmailAlreadyExistsException from "../../../exceptions/EmailAlreadyExists";
import bcrypt from "bcrypt";

export class MockAuthenticationService implements IAuthenticationService {
  readonly _db = database;

  public async getUserByEmailAndPassword(email: string, password: string): Promise<IUser | null> {
    let user = await this.findUserByEmail(email);
    if (!user) {
      throw new Error("User with that email does not exists");
    }
    if (user) {
      const correctPassword = await bcrypt.compare(password, user.password);
      if (correctPassword) {
        return user;
      } else {
        throw new Error("Incorrect password");
      }
    }
  }

  public async getUserById(id: number): Promise<IUser | null> {
    let user = await this._db.users.find((user) => user.id === id);
    if (user) {
      return user;
    } else {
      throw new Error("User with that id does not exists");
    }
  }

  public async findUserByEmail(email: String): Promise<IUser | null> {
    let user = await this._db.users.find((user) => user.email === email);
    if (user) {
      return user;
    } else {
      return null;
    }
  }

  public async createUser(user: IUser): Promise<IUser> {
    const { username, firstName, lastName, email, password } = user;
    const userAlreadyExists = await this.findUserByEmail(email);
    if (userAlreadyExists) {
      throw new EmailAlreadyExistsException(email);
    } else {
      const hash = await bcrypt.hash(password, 10);
      const newUser = {
        id: this._db.users.length + 1,
        username,
        firstName,
        lastName,
        email,
        password: hash,
      };
      this._db.users.push(newUser);
      return newUser;
    }
  }
}
