import { Request, Response, NextFunction, Router } from "express";
import IController from "../../../interfaces/controller.interface";
import ISettingService from "../services/ISettingService";
import { ensureAuthenticated } from "../../../middleware/authentication.middleware";

class SettingController implements IController {
  public path = "/setting";
  public router = Router();
  settingService: ISettingService;

  constructor(settingService: ISettingService) {
    this.settingService = settingService;
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/`, ensureAuthenticated, this.getSettingsPage);
    this.router.post(`${this.path}/change-username`, ensureAuthenticated, this.changeUsername);
    this.router.post(`${this.path}/change-email`, ensureAuthenticated, this.changeEmail);
    this.router.post(`${this.path}/change-password`, ensureAuthenticated, this.changePassword);
  }
  private getSettingsPage = async (req: Request, res: Response, next: NextFunction) => {
    res.render("setting/views/setting");
  };
  private changeUsername = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      const { newUsername } = req.body;
      if (newUsername === user.username) throw new Error("New username is the same as the old one.");
      if (newUsername.trim() === "") throw new Error("Username cannot be empty.");
      await this.settingService.changeUsername(user.id, newUsername);
      req.session.success = `Your username was successfully changed to ${newUsername}.`;
      res.redirect("/setting");
    } catch (error) {
      req.session.messages = [error.message];
      next(error);
      res.redirect("/setting");
    }
  };
  private changeEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      const { newEmail } = req.body;
      if (newEmail === user.email) throw new Error("New email is the same as the old one.");
      if (newEmail.trim() === "") throw new Error("Email cannot be empty.");
      await this.settingService.changeEmail(user.id, newEmail);
      req.session.success = `Your email was successfully changed to ${newEmail}.`;
      res.redirect("/setting");
    } catch (error) {
      req.session.messages = [error.message];
      res.redirect("/setting");
      next(error);
    }
  };
  private changePassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      const { currentPassword, newPassword } = req.body;
      await this.settingService.changePassword(user.id, currentPassword, newPassword);
      req.session.success = "Password changed successfully";
      res.redirect("/setting");
    } catch (error) {
      req.session.messages = [error.message];
      res.redirect("/setting");
      next(error);
    }
  };
}

export default SettingController;
