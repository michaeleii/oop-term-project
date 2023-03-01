export default interface ISettingService {
  changeUsername(userId: number, username: string): void;
  changeEmail(userId: number, email: string): void;
  changePassword(userId: number, currentPassword: string, newPassword: string): void;
}
