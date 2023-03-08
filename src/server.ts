import App from "./App";
import PostController from "./areas/post/controllers/post.controller";
import LandingController from "./areas/landing/controllers/Landing.controller";
import AuthenticationController from "./areas/authentication/controllers/Authentication.controller";
import { AuthenticationService } from "./areas/authentication/services/Authentication.service";
import { PostService } from "./areas/post/services/Post.service";
import { SearchService } from "./areas/search/services/Search.service";
import SearchController from "./areas/search/controllers/search.controller";
import SettingController from "./areas/setting/controllers/setting.controller";
import { MockSettingService } from "./areas/setting/services";

const server = new App([
  new LandingController(),
  new PostController(new PostService()),
  new AuthenticationController(new AuthenticationService()),
  new SearchController(new SearchService()),
  new SettingController(new MockSettingService()),
]);

server.start();
