import { database } from "../../../model/fakeDB";
import ISettingService from "../services/ISettingService";
import bcrypt from "bcrypt";

export class MockSettingService implements ISettingService {
  readonly _db = database;
  changeUsername(userId: number, username: string): void {
    const user = this._db.users.find((user) => user.id === userId);
    user.username = username;
  }
  changeEmail(userId: number, email: string): void {
    const user = this._db.users.find((user) => user.id === userId);
    user.email = email;
  }
  async changePassword(userId: number, currentPassword: string, newPassword: string): Promise<void> {
    const user = this._db.users.find((user) => user.id === userId);
    if (user) {
      const passwordMatches = await bcrypt.compare(currentPassword, user.password);
      if (passwordMatches) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
        user.password = hashedPassword;
      } else {
        throw new Error("Current password is incorrect");
      }
    }
  }
}
