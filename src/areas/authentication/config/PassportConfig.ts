//----------------------------------------
// TODO:                                 |
//----------------------------------------
// 🚀 Configure Passport.js Local Authentication in this file
//    Ensure code is fully typed wherever possible (unless inference can be made)
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

export default class PassportConfig {
  private name: string;
  private strategy: LocalStrategy;
  constructor() {
    this.name = "local";
    this.strategy = new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      (email, password, done) => {
        try {
        } catch (error: any) {}
      }
    );
  }
  private serializeUser() {}
  private deserializeUser() {}
}

const localStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (email, password, done) => {
    try {
    } catch (error: any) {}
  }
);
