export default interface ISettingService {
  changeUsername(username: string): void;
  changeEmail(email: string): void;
  changePassword(currentPassword: string, newPassword: string): void;
}
