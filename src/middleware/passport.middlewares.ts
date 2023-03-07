import { AuthenticationService } from "../areas/authentication/services/Authentication.service";
import passport from "passport";
import PassportConfig from "../areas/authentication/config/PassportConfig";

const passportLocal = new PassportConfig("local", new AuthenticationService());
module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());
  // Use PassportConfig class here;
  passportLocal.serializeUser(passport);
  passportLocal.deserializeUser(passport);
};
