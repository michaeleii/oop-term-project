import ISettingService from "../services/ISettingService";

export class MockSettingService implements ISettingService {
  changeUsername(username: string): void {
    throw new Error("Method not implemented.");
  }
  changeEmail(email: string): void {
    throw new Error("Method not implemented.");
  }
  changePassword(currentPassword: string, newPassword: string): void {
    throw new Error("Method not implemented.");
  }
}
