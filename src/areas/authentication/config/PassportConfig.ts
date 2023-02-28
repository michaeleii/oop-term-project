//----------------------------------------
// TODO:                                 |
//----------------------------------------
// 🚀 Configure Passport.js Local Authentication in this file
//    Ensure code is fully typed wherever possible (unless inference can be made)
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { MockAuthenticationService } from "../services/Authentication.service.mock";
declare global {
  namespace Express {
    interface User {
      id: string;
    }
  }
}

export default class PassportConfig {
  private _name: string;
  private _strategy: LocalStrategy;
  constructor(name: string) {
    this._name = name;
    this._strategy = new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      (email: string, password: string, done) => {
        try {
          console.log("email: ", email);
          console.log("password: ", password);
        } catch (error: any) {
          console.log("error: ", error);
        }
      }
    );
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
    passport.deserializeUser((id: string, done) => {
      const authentication = new MockAuthenticationService();
      let user = authentication.getUserById(id);
      if (user) {
        done(null, user as any);
      } else {
        done({ message: "User not found" }, null);
      }
    });
  }
}
