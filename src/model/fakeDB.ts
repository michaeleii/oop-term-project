import IDatabase from "../interfaces/database.interface.ts";
import { Users } from "./Users";
import { Followers } from "./Followers";
import { Posts } from "./Posts";
import { Comments } from "./Comments";
import { Likes } from "./Likes";

const database: IDatabase = {
  users: Users,
  followers: Followers,
  posts: Posts,
  comments: Comments,
  likes: Likes,
};

// -------- Note: I only created these as a simple test example for you, delete them later and use above db or your own --------------
const userDatabase = [
  {
    id: "1",
    firstName: "Armaan",
    lastName: "Armaan",
    email: "ad123@gmail.com",
    password: "ad123123!",
    role: "admin",
  },
  {
    id: "2",
    firstName: "John",
    lastName: "Armaan",
    email: "jo123@gmail.com",
    password: "jo123",
    role: "user",
  },
];

const post = {
  postId: 5,
  userId: "john",
  createdAt: new Date(),
  message: "Hi there",
  comments: "1",
  likes: "2",
  commentList: ["cool post"],
};

const posts = [
  {
    postId: 5,
    userId: "john",
    createdAt: new Date(),
    message: "Hi there",
    comments: "1",
    likes: "2",
    commentList: ["cool post"],
  },
  {
    postId: 4,
    userId: "john",
    createdAt: new Date(),
    message: "this is a new post by me",
    comments: "1",
    likes: "2",
    commentList: ["cool post"],
  },
];

export { userDatabase, database, post, posts };
