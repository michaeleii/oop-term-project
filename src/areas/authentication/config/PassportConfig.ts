//----------------------------------------
// TODO:                                 |
//----------------------------------------
// 🚀 Configure Passport.js Local Authentication in this file
//    Ensure code is fully typed wherever possible (unless inference can be made)
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

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
  registerStrategy() {
    passport.use(this._name, this._strategy);
  }
  serializeUser() {}
  deserializeUser() {}
}
