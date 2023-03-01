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
    this.router.post(`Route to change username`, ensureAuthenticated, this.changeUsername);
    this.router.post(`Route to change email`, ensureAuthenticated, this.changeEmail);
    this.router.post(`Route to change password`, ensureAuthenticated, this.changePassword);
  }
  private getSettingsPage = async (request: Request, res: Response, next: NextFunction) => {
    const user = await request.user;
    res.render("setting/views/setting", { user });
  };
  private changeUsername = async (req: Request, res: Response, next: NextFunction) => {
    const user = await req.user;
    console.log(req.body);
    // this.settingService.changeUsername();
    res.redirect("/setting");
  };
  private changeEmail = async (req: Request, res: Response, next: NextFunction) => {
    const user = await req.user;
    console.log(req.body);
    // this.settingService.changeEmail();
    res.redirect("/setting");
  };
  private changePassword = async (req: Request, res: Response, next: NextFunction) => {
    const user = await req.user;
    console.log(req.body);
    // this.settingService.changePassword();
    res.redirect("/setting");
  };
}

export default SettingController;
