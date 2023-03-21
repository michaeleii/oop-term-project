import { AuthenticationService } from "../areas/authentication/services/Authentication.service";
import passport from "passport";
import PassportConfig from "../areas/authentication/config/PassportConfig";
import { setCurrentUser } from "./authentication.middleware";
import express from "express";

const passportLocal = new PassportConfig("local", new AuthenticationService());
module.exports = (app: express.Application) => {
  app.use(passport.initialize());
  app.use(passport.session());
  passportLocal.serializeUser(passport);
  passportLocal.deserializeUser(passport);
  app.use(setCurrentUser);
};
