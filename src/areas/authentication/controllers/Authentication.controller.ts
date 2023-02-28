import express from "express";
import passport from "passport";
import IController from "../../../interfaces/controller.interface";
import { IAuthenticationService } from "../services";

declare module "express-session" {
  interface SessionData {
    messages: string[];
  }
}
declare global {
  namespace Express {
    interface Request {
      logout(done: (err: any) => void): void;
    }
  }
}

class AuthenticationController implements IController {
  public path = "/auth";
  public router = express.Router();
  public localStrategyOptions = {
    successRedirect: "/posts",
    failureRedirect: `${this.path}/login`,
    failureMessage: true,
  };

  constructor(service: IAuthenticationService) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/register`, this.showRegistrationPage);
    this.router.post(`${this.path}/register`, this.registration);
    this.router.get(`${this.path}/login`, this.showLoginPage);
    this.router.post(`${this.path}/login`, this.login);
    this.router.post(`${this.path}/logout`, this.logout);
  }

  private showLoginPage = (req: express.Request, res: express.Response) => {
    const error = req.session.messages;
    req.session.messages = [];
    res.render("authentication/views/login", { error });
  };

  private showRegistrationPage = (_: express.Request, res: express.Response) => {
    res.render("authentication/views/register");
  };

  // 🔑 These Authentication methods needs to be implemented by you
  private login = passport.authenticate("local", this.localStrategyOptions);
  private registration = async (req: express.Request, res: express.Response, next: express.NextFunction) => {};
  private _logout = async (req: express.Request, res: express.Response) => {
    req.logout((err) => {
      if (err) console.log(err);
    });
    res.redirect("/auth/login");
  };
  public get logout() {
    return this._logout;
  }
  public set logout(value) {
    this._logout = value;
  }
}

export default AuthenticationController;
