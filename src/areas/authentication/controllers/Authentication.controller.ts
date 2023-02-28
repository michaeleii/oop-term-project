import EmailAlreadyExistsException from "../../../exceptions/EmailAlreadyExists";
import express from "express";
import passport from "passport";
import IController from "../../../interfaces/controller.interface";
import { IAuthenticationService } from "../services";

declare module "express-session" {
  interface SessionData {
    messages: string[];
    error: string;
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
  public service: IAuthenticationService;

  constructor(service: IAuthenticationService) {
    this.service = service;
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

  private showRegistrationPage = (req: express.Request, res: express.Response) => {
    const error = req.session.error;
    req.session.error = "";
    res.render("authentication/views/register", { error });
  };

  // 🔑 These Authentication methods needs to be implemented by you
  private login = passport.authenticate("local", this.localStrategyOptions);
  private registration = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      let user = await this.service.createUser(req.body);
      res.redirect("/auth/login");
    } catch (error) {
      req.session.error = error.message;
      res.redirect("/auth/register");
      next(error);
    }
  };
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
