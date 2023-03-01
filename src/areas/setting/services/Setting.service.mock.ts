import { database } from "../../../model/fakeDB";
import ISettingService from "../services/ISettingService";

export class MockSettingService implements ISettingService {
  readonly _db = database;
  changeUsername(userId: number, username: string): void {
    throw new Error("Method not implemented.");
  }
  changeEmail(userId: number, email: string): void {
    throw new Error("Method not implemented.");
  }
  changePassword(userId: number, currentPassword: string, newPassword: string): void {
    throw new Error("Method not implemented.");
  }
}
