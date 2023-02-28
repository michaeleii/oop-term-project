import { MockAuthenticationService } from "../areas/authentication/services/Authentication.service.mock";
import passport from "passport";
import PassportConfig from "../areas/authentication/config/PassportConfig";

const passportLocal = new PassportConfig("local", new MockAuthenticationService());
module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());
  // Use PassportConfig class here;
  passportLocal.serializeUser(passport);
  passportLocal.deserializeUser(passport);
};
