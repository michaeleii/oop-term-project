import { Request, Response, NextFunction, Router } from "express";
import IController from "../../../interfaces/controller.interface";
import { ensureAuthenticated } from "../../../middleware/authentication.middleware";
import ISearchService from "../services/ISearchService";

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
  }
  private search = async (req: Request, res: Response, next: NextFunction) => {};
}

export default SearchController;
