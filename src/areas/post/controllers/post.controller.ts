import { Request, Response, NextFunction, Router } from "express";
import IController from "../../../interfaces/controller.interface";
import IPostService from "../services/IPostService";
import { post, posts } from "../../../model/fakeDB";
import { ensureAuthenticated } from "../../../middleware/authentication.middleware";
import { PostViewModel } from "../views/post.viewmodel";

class PostController implements IController {
  public path = "/posts";
  public router = Router();
  postService: IPostService;

  constructor(postService: IPostService) {
    this.initializeRoutes();
    this.postService = postService;
  }

  private initializeRoutes() {
    this.router.get(this.path, ensureAuthenticated, this.getAllPosts);
    this.router.get(`${this.path}/:id`, this.getPostById);
    this.router.get(`${this.path}/:id/delete`, this.deletePost);
    this.router.post(`${this.path}/:id/comment`, this.createComment);
    this.router.post(`${this.path}`, this.createPost);
  }

  // 🚀 This method should use your postService and pull from your actual fakeDB, not the temporary posts object
  private getAllPosts = async (req: Request, res: Response) => {
    const user = await req.user;
    const posts = this.postService.getAllPosts(user.id);
    const postsFormatted = posts.map((post) => new PostViewModel(post));
    res.render("post/views/posts", { posts: postsFormatted, user });
  };

  // 🚀 This method should use your postService and pull from your actual fakeDB, not the temporary post object
  private getPostById = async (request: Request, res: Response, next: NextFunction) => {
    const id = request.params.id;
    const post = this.postService.findById(parseInt(id));
    const postFormatted = new PostViewModel(post);
    res.render("post/views/post", { post: postFormatted });
  };

  // 🚀 These post methods needs to be implemented by you
  private createComment = async (req: Request, res: Response, next: NextFunction) => {};
  private createPost = async (req: Request, res: Response, next: NextFunction) => {
    const user = await req.user;
    const message: string = req.body.postText;
    this.postService.addPost(message, user.id);
    res.redirect("/posts");
  };
  private deletePost = async (req: Request, res: Response, next: NextFunction) => {};
}

export default PostController;
