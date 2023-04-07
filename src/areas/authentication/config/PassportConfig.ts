import IUser from "../../../interfaces/user.interface";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { IAuthenticationService } from "../services/IAuthentication.service";
import FormValidater from "../../../helper/FormValidater";

declare global {
  namespace Express {
    interface User extends IUser {}
  }
}

export default class PassportConfig {
  private _name: string;
  private _strategy: LocalStrategy;
  private _authenticationService: IAuthenticationService;
  constructor(name: string, authenticationService: IAuthenticationService) {
    this._authenticationService = authenticationService;
    this._name = name;
    this._strategy = new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email: string, password: string, done) => {
        try {
          if (FormValidater.IsEmpty(email)) throw new Error("Email is required");
          if (FormValidater.IsEmpty(password)) throw new Error("Password is required");
          const user = await this._authenticationService.getUserByEmailAndPassword(email, password);
          return done(null, user);
        } catch (error: any) {
          return done(null, false, error);
        }
      }
    );
    this.registerStrategy(passport);
  }
  registerStrategy(passport: passport.PassportStatic) {
    passport.use(this._name, this._strategy);
    this.serializeUser(passport);
    this.deserializeUser(passport);
  }
  private serializeUser(passport: passport.PassportStatic) {
    passport.serializeUser((user, done) => {
      done(null, user.id);
    });
  }
  private deserializeUser(passport: passport.PassportStatic) {
    passport.deserializeUser(async (id: string, done) => {
      let user = await this._authenticationService.getUserById(id);
      if (user) {
        done(null, user);
      } else {
        done({ message: "User not found" }, null);
      }
    });
  }
}
