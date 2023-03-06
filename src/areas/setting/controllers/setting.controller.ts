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
  private getSettingsPage = async (request: Request, res: Response, next: NextFunction) => {
    const user = await request.user;
    res.render("setting/views/setting", { user });
  };
  private changeUsername = async (req: Request, res: Response, next: NextFunction) => {
    const user = await req.user;
    const { username } = req.body;
    this.settingService.changeUsername(user.id, username);
    res.redirect("/setting");
  };
  private changeEmail = async (req: Request, res: Response, next: NextFunction) => {
    const user = await req.user;
    const { email } = req.body;
    this.settingService.changeEmail(user.id, email);
    res.redirect("/setting");
  };
  private changePassword = async (req: Request, res: Response, next: NextFunction) => {
    const user = await req.user;
    const { currentPassword, newPassword } = req.body;
    this.settingService.changePassword(user.id, currentPassword, newPassword);
    res.redirect("/setting");
  };
}

export default SettingController;
