import { database } from "../../../model/fakeDB";
import IUser from "../../../interfaces/user.interface";
import { IAuthenticationService } from "./IAuthentication.service";

export class MockAuthenticationService implements IAuthenticationService {
  readonly _db = database;

  public async getUserByEmailAndPassword(email: string, password: string): Promise<IUser | null> {
    let user = await this.findUserByEmail(email);
    if (user && user.password === password) {
      return user;
    } else {
      throw new Error("Invalid password");
    }
  }

  public async getUserById(id: string): Promise<IUser | null> {
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
      throw new Error("User with that email does not exists");
    }
  }

  public async createUser(user: any): Promise<IUser> {
    throw new Error("Method not implemented");
  }
}
