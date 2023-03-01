import App from "./App";
import PostController from "./areas/post/controllers/post.controller";
import LandingController from "./areas/landing/controllers/Landing.controller";
import AuthenticationController from "./areas/authentication/controllers/Authentication.controller";
import { MockAuthenticationService } from "./areas/authentication/services/Authentication.service.mock";
import { /*PostService,*/ MockPostService } from "./areas/post/services";
import { MockSettingService } from "./areas/setting/services";
import SettingController from "./areas/setting/controllers/setting.controller";
import SearchController from "./areas/search/controllers/search.controller";
import { MockSearchService } from "./areas/search/services";

const server = new App([
  new LandingController(),
  new PostController(new MockPostService()),
  new AuthenticationController(new MockAuthenticationService()),
  new SettingController(new MockSettingService()),
  new SearchController(new MockSearchService()),
]);

server.start();
