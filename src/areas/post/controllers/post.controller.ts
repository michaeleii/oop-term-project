import { Request, Response, NextFunction, Router } from "express";
import IController from "../../../interfaces/controller.interface";
import IPostService from "../services/IPostService";
import { ensureAuthenticated } from "../../../middleware/authentication.middleware";
import { PostViewModel } from "../views/post.viewmodel";
import PostNotFoundException from "../../../exceptions/PostNotFoundException";

class PostController implements IController {
  public path = "/posts";
  public router = Router();
  postService: IPostService;

  constructor(postService: IPostService) {
    this.initializeRoutes();
    this.postService = postService;
  }

  private initializeRoutes() {
    this.router.get(this.path, ensureAuthenticated, this.getAllMyPosts);
    this.router.get(`${this.path}/following`, ensureAuthenticated, this.getAllFollowerPosts);
    this.router.get(`${this.path}/:id`, ensureAuthenticated, this.getPostById);
    this.router.post(`${this.path}/:id/delete`, ensureAuthenticated, this.deletePost);
    this.router.post(`${this.path}/:id/comment`, ensureAuthenticated, this.createComment);
    this.router.get(`${this.path}/:id/like`, ensureAuthenticated, this.likePostById);
    this.router.post(`${this.path}`, ensureAuthenticated, this.createPost);
    this.router.get(`${this.path}/:id/invalidPost`, ensureAuthenticated, this.showInvalidPost);
  }

  // 🚀 This method should use your postService and pull from your actual fakeDB, not the temporary posts object
  private getAllMyPosts = async (req: Request, res: Response) => {
    const user = await req.user;
    const posts = await this.postService.getAllPosts(user.id);
    const postsFormatted = posts.map((post) => new PostViewModel(post, user.id));
    res.render("post/views/posts", { posts: postsFormatted, user });
  };
  private getAllFollowerPosts = async (req: Request, res: Response) => {
    const user = await req.user;
    const followers = await this.postService.getUserFollowers(user.id);
    const posts = await this.postService.getAllPostsByUserFollowers(followers);
    const postsFormatted = posts.map((post) => new PostViewModel(post, user.id));
    res.render("post/views/posts", { posts: postsFormatted, user });
  };

  // 🚀 This method should use your postService and pull from your actual fakeDB, not the temporary post object
  private getPostById = async (req: Request, res: Response, next: NextFunction) => {
    const id = +req.params.id;
    const userId = await req.user.id;
    try {
      const post = await this.postService.findById(id);
      if (!post) {
        res.redirect(`/posts/${id}/invalidPost`);
        next(new PostNotFoundException(id));
      } else {
        const postFormatted = new PostViewModel(post, userId);
        res.render("post/views/post", { post: postFormatted });
      }
    } catch (error) {
      console.log(error);
    }
  };
  private showInvalidPost = async (req: Request, res: Response) => {
    const id = req.params.id;
    res.render("post/views/invalidPost", { id });
  };

  private likePostById = async (req: Request, res: Response, next: NextFunction) => {
    const user = await req.user;
    const postId = +req.params.id;
    const post = new PostViewModel(await this.postService.findById(postId), user.id);
    const likedPost = post.userLiked;
    if (likedPost) {
      await this.postService.unlikePost(postId, user.id);
    } else {
      await this.postService.likePost(postId, user.id);
    }
    res.redirect("back");
  };

  // 🚀 These post methods needs to be implemented by you
  private createComment = async (req: Request, res: Response, next: NextFunction) => {
    const user = await req.user;
    const postId = +req.params.id;
    const message: string = req.body.commentText;
    if (message.trim() !== "") {
      await this.postService.addCommentToPost(user.id, message, postId);
    }
    res.redirect("back");
  };

  private createPost = async (req: Request, res: Response, next: NextFunction) => {
    const user = await req.user;
    const message: string = req.body.postText;
    if (message.trim() !== "") {
      await this.postService.addPost(message, user.id);
    }
    res.redirect("back");
  };
  private deletePost = async (req: Request, res: Response, next: NextFunction) => {
    const postId = +req.params.id;
    const user = await req.user;
    const post = await this.postService.findById(postId);
    if (post.creatorId === user.id) {
      await this.postService.deletePost(postId);
    }
    res.redirect("back");
  };
}

export default PostController;
