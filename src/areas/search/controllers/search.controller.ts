import { Request, Response, NextFunction, Router } from "express";
import IController from "../../../interfaces/controller.interface";
import { ensureAuthenticated } from "../../../middleware/authentication.middleware";
import ISearchService from "../services/ISearchService";
import { SearchPostViewModel } from "../views/search.post.viewmodel";
import { SearchUserViewModel } from "../views/search.user.viewmodel";

class SearchController implements IController {
  public path = "/search";
  public router = Router();
  searchService: ISearchService;

  constructor(searchService: ISearchService) {
    this.initializeRoutes();
    this.searchService = searchService;
  }

  private initializeRoutes() {
    this.router.get(this.path, ensureAuthenticated, this.search);
    this.router.get(`${this.path}/:id/follow`, ensureAuthenticated, this.followUser);
  }
  private search = async (req: Request, res: Response, next: NextFunction) => {
    const searchTerm = String(req.query.query).toLowerCase();
    const users = await this.searchService.searchUsers(searchTerm);
    const posts = await this.searchService.searchPosts(searchTerm);
    const currentUser = await req.user;
    const usersFormatted = users.map((searchedUser) => new SearchUserViewModel(searchedUser, currentUser.id));
    const postsFormatted = posts.map((post) => new SearchPostViewModel(post));
    res.render("search/views/search", { users: usersFormatted, posts: postsFormatted });
  };
  private followUser = async (req: Request, res: Response, next: NextFunction) => {
    const followingId = +req.params.id;
    const currentUser = await req.user;
    const user = new SearchUserViewModel(await this.searchService.getUser(followingId), currentUser.id);
    const isFollowing = user.following;

    if (isFollowing) {
      await this.searchService.unfollowUser(currentUser.id, followingId);
    } else {
      await this.searchService.followUser(currentUser.id, followingId);
    }
    res.redirect("back");
  };
}

export default SearchController;
