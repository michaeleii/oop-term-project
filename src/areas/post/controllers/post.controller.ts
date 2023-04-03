import { Request, Response, NextFunction, Router } from "express";
import IController from "../../../interfaces/controller.interface";
import IPostService from "../services/IPostService";
import { ensureAuthenticated } from "../../../middleware/authentication.middleware";
import { PostViewModel } from "../views/post.viewmodel";
import PostNotFoundException from "../../../exceptions/PostNotFoundException";
import IUser from "../../../interfaces/user.interface";
declare global {
  namespace Express {
    interface User extends IUser {}
  }
}
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

  private getAllMyPosts = async (req: Request, res: Response) => {
    const user = req.user;
    const posts = await this.postService.getAllPosts(user.id);
    const postsFormatted = await Promise.all(
      posts.map(async (post) => {
        const postViewModel = new PostViewModel();
        await postViewModel.init(post, user.id);
        return postViewModel;
      })
    );

    res.render("post/views/posts", { posts: postsFormatted });
  };
  private getAllFollowerPosts = async (req: Request, res: Response) => {
    const user = req.user;
    const followers = await this.postService.getUserFollowers(user.id);
    const posts = await this.postService.getAllPostsByUserFollowers(followers);

    const postsFormatted = await Promise.all(
      posts.map(async (post) => {
        const postViewModel = new PostViewModel();
        await postViewModel.init(post, user.id);
        return postViewModel;
      })
    );

    res.render("post/views/posts", { posts: postsFormatted });
  };

  private getPostById = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const userId = req.user.id;
    try {
      const post = await this.postService.findById(id);
      if (!post) {
        res.redirect(`/posts/${id}/invalidPost`);
        next(new PostNotFoundException(id));
      } else {
        const postFormatted = new PostViewModel();
        await postFormatted.init(post, userId);
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
    const user = req.user;
    const postId = req.params.id;
    const post = new PostViewModel();
    await post.init(await this.postService.findById(postId), user.id);
    const likedPost = post.userLiked;
    likedPost ? await this.postService.unlikePost(postId, user.id) : await this.postService.likePost(postId, user.id);
    res.redirect("back");
  };

  private createComment = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const postId = req.params.id;
    const message: string = req.body.commentText;
    if (message.trim() !== "") {
      await this.postService.addCommentToPost(user.id, message, postId);
    }
    res.redirect("back");
  };

  private createPost = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const message: string = req.body.postText;
    if (message.trim() !== "") {
      await this.postService.addPost(message, user.id);
    }
    res.redirect("back");
  };
  private deletePost = async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.params.id;
    const user = req.user;
    const post = await this.postService.findById(postId);
    if (post.creatorId === user.id) {
      await this.postService.deletePost(postId);
    }
    res.redirect("back");
  };
}

export default PostController;
