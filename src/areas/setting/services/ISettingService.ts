export default interface ISettingService {
  changeUsername(userId: number, username: string): Promise<void>;
  changeEmail(userId: number, email: string): Promise<void>;
  changePassword(userId: number, currentPassword: string, newPassword: string): Promise<void>;
}
