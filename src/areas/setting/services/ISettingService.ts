export default interface ISettingService {
  changeUsername(username: string): Promise<void>;
  changeEmail(email: string): Promise<void>;
  changePassword(currentPassword: string, newPassword: string): Promise<void>;
}
