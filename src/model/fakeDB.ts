import IDatabase from "../interfaces/database.interface.ts";
import { Users } from "./Users";
import { Followers } from "./Followers";
import { Posts } from "./Posts";
import { Comments } from "./Comments";
import { Likes } from "./Likes";

export const database: IDatabase = {
  users: Users,
  followers: Followers,
  posts: Posts,
  comments: Comments,
  likes: Likes,
};
