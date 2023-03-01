import { Request, Response, NextFunction, Router } from "express";
import IController from "../../../interfaces/controller.interface";
import ISettingService from "../services/ISettingService";
import { ensureAuthenticated } from "../../../middleware/authentication.middleware";

class SettingController implements IController {
  public path = "/setting";
  public router = Router();

  constructor(settingService: ISettingService) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/`, ensureAuthenticated, this.getSettingsPage);
    //Route to change username
    //Route to change email
    //Route to change password
  }
  private getSettingsPage = async (request: Request, res: Response, next: NextFunction) => {
    const user = await request.user;
    res.render("setting/views/setting", { user });
  };
  private changeUsername = async (request: Request, res: Response, next: NextFunction) => {
    const user = await request.user;
  };
  private changeEmail = async (request: Request, res: Response, next: NextFunction) => {
    const user = await request.user;
  };
  private changePassword = async (request: Request, res: Response, next: NextFunction) => {
    const user = await request.user;
  };
}

export default SettingController;
