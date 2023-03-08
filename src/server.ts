import App from "./App";
import PostController from "./areas/post/controllers/post.controller";
import LandingController from "./areas/landing/controllers/Landing.controller";
import AuthenticationController from "./areas/authentication/controllers/Authentication.controller";
import { AuthenticationService } from "./areas/authentication/services/Authentication.service";
import { PostService } from "./areas/post/services/Post.service";
import { MockSettingService } from "./areas/setting/services";
import SettingController from "./areas/setting/controllers/setting.controller";
import SearchController from "./areas/search/controllers/search.controller";
import { MockSearchService } from "./areas/search/services";

const server = new App([
  new LandingController(),
  new PostController(new PostService()),
  new AuthenticationController(new AuthenticationService()),
  new SettingController(new MockSettingService()),
  new SearchController(new MockSearchService()),
]);

server.start();
