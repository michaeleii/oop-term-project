//----------------------------------------
// TODO:                                 |
//----------------------------------------
// 🚀 Configure Passport.js Local Authentication in this file
//    Ensure code is fully typed wherever possible (unless inference can be made)
import IUser from "../../../interfaces/user.interface";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { MockAuthenticationService } from "../services/Authentication.service.mock";
declare global {
  namespace Express {
    interface User extends IUser {}
  }
}

export default class PassportConfig {
  private _name: string;
  private _strategy: LocalStrategy;
  private _authenticationService: MockAuthenticationService;
  constructor(name: string, authenticationService: MockAuthenticationService) {
    this._authenticationService = authenticationService;
    this._name = name;
    this._strategy = new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email: string, password: string, done) => {
        try {
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
  }
  serializeUser(passport: passport.PassportStatic) {
    passport.serializeUser((user, done) => {
      done(null, user.id);
    });
  }
  deserializeUser(passport: passport.PassportStatic) {
    passport.deserializeUser((id: number, done) => {
      let user = this._authenticationService.getUserById(id);
      if (user) {
        done(null, user as any);
      } else {
        done({ message: "User not found" }, null);
      }
    });
  }
}
