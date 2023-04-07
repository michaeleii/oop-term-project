import { AuthenticationService } from "../areas/authentication/services/Authentication.service";
import passport from "passport";
import PassportConfig from "../areas/authentication/config/PassportConfig";
import { setCurrentUser } from "./authentication.middleware";
import { Application } from "express";

new PassportConfig("local", new AuthenticationService());
module.exports = (app: Application) => {
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(setCurrentUser);
};
