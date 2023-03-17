import ISettingService from "./ISettingService";
import DBClient from "../../../PrismaClient";

export class SettingService implements ISettingService {
  readonly _db: DBClient = DBClient.getInstance();
  async changeUsername(userId: number, username: string): Promise<void> {
    const alreadyExistingUsername = await this._db.prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (alreadyExistingUsername) {
      throw new Error("Username already exists.");
    } else {
      await this._db.prisma.user.update({ data: { username }, where: { id: userId } });
    }
  }
  async changeEmail(userId: number, email: string): Promise<void> {
    const alreadyExistingEmail = await this._db.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (alreadyExistingEmail) {
      throw new Error("Email already exists.");
    } else {
      await this._db.prisma.user.update({ data: { email }, where: { id: userId } });
    }
  }
  async changePassword(userId: number, currentPassword: string, newPassword: string): Promise<void> {
    const user = await this._db.prisma.user.findUnique({ where: { id: userId } });
    if (user) {
      const passwordMatches = await this._db.prisma.user.findUnique({
        where: { id: userId },
        select: { password: true },
      });
      if (passwordMatches) {
        await this._db.prisma.user.update({ data: { password: newPassword }, where: { id: userId } });
      } else {
        throw new Error("Current password is incorrect");
      }
    }
  }
}
