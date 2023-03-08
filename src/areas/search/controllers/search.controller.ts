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
    const usersFormatted = await Promise.all(
      users.map(async (searchedUser) => await new SearchUserViewModel().init(searchedUser, currentUser.id))
    );
    const postsFormatted = await Promise.all(posts.map(async (post) => await new SearchPostViewModel().init(post)));
    res.render("search/views/search", { users: usersFormatted, posts: postsFormatted });
  };
  private followUser = async (req: Request, res: Response, next: NextFunction) => {
    const followingId = +req.params.id;
    const currentUser = await req.user;
    const user = new SearchUserViewModel();
    await user.init(await this.searchService.getUser(followingId), currentUser.id);
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
