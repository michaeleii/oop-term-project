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
    const searchTerm = String(req.query.query);
    const [users, posts] = await Promise.all([
      this.searchService.searchUsers(searchTerm),
      this.searchService.searchPosts(searchTerm),
    ]);
    const currentUser = req.user;
    const usersFormatted = await Promise.all(
      users.map(async (searchedUser) => {
        const searchUserViewModel = new SearchUserViewModel();
        await searchUserViewModel.init(searchedUser, currentUser.id);
        return searchUserViewModel;
      })
    );
    const postsFormatted = await Promise.all(
      posts.map(async (post) => {
        const searchPostViewModel = new SearchPostViewModel();
        await searchPostViewModel.init(post);
        return searchPostViewModel;
      })
    );
    res.render("search/views/search", { users: usersFormatted, posts: postsFormatted });
  };
  private followUser = async (req: Request, res: Response, next: NextFunction) => {
    const followingId = req.params.id;
    const currentUser = req.user;
    const user = new SearchUserViewModel();
    await user.init(await this.searchService.getUser(followingId), currentUser.id);
    const isFollowing = user.following;

    isFollowing
      ? await this.searchService.unfollowUser(currentUser.id, followingId)
      : await this.searchService.followUser(currentUser.id, followingId);

    res.redirect("back");
  };
}

export default SearchController;
