import { database } from "../../../model/fakeDB";
import ISettingService from "../services/ISettingService";

export class MockSettingService implements ISettingService {
  readonly _db = database;
  changeUsername(userId: number, username: string): void {
    const user = this._db.users.find((user) => user.id === userId);
    user.username = username;
  }
  changeEmail(userId: number, email: string): void {}
  changePassword(userId: number, currentPassword: string, newPassword: string): void {}
}
