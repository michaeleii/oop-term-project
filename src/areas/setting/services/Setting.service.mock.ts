import ISettingService from "../services/ISettingService";

export class MockSettingService implements ISettingService {
  changeUsername(username: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  changeEmail(email: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  changePassword(currentPassword: string, newPassword: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
