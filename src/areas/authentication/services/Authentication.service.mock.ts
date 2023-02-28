import { database } from "../../../model/fakeDB";
import IUser from "../../../interfaces/user.interface";
import { IAuthenticationService } from "./IAuthentication.service";

export class MockAuthenticationService implements IAuthenticationService {
  readonly _db = database;

  public async getUserByEmailAndPassword(email: string, password: string): Promise<null | IUser> {
    let user = await this.findUserByEmail(email);
    if (user && user.password === password) {
      return user;
    } else {
      return null;
    }
  }
  async getUserById(id: string): Promise<null | IUser> {
    return await this._db.users.find((user) => user.id === id);
  }

  public async findUserByEmail(email: String): Promise<null | IUser> {
    return await this._db.users.find((user) => user.email === email);
  }

  public async createUser(user: any): Promise<IUser> {
    throw new Error("Method not implemented");
  }
}
