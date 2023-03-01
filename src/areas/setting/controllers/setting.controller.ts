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
    this.router.get(`${this.path}/:id`, ensureAuthenticated, this.getSettingsPage);
    this.router.get(`${this.path}/:id`, ensureAuthenticated, this.getSettingsPage);
    this.router.get(`${this.path}/:id`, ensureAuthenticated, this.getSettingsPage);
  }
  private getSettingsPage = async (request: Request, res: Response, next: NextFunction) => {
    const user = await request.user;
    res.render("setting/views/setting", { user });
  };
}

export default SettingController;
