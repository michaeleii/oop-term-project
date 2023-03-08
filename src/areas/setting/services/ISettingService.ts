import IDatabase from "../../../interfaces/database.interface.ts";
import DBClient from "../../../PrismaClient";

export default interface ISettingService {
  readonly _db: DBClient | IDatabase;
  changeUsername(userId: number, username: string): Promise<void>;
  changeEmail(userId: number, email: string): Promise<void>;
  changePassword(userId: number, currentPassword: string, newPassword: string): Promise<void>;
}
