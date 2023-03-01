import IPost from "../interfaces/post.interface";

export const Posts: IPost[] = [
  {
    id: 1,
    creator: 1,
    message: "Microsoft is a nice company",
    createdAt: new Date(),
  },
  {
    id: 2,
    creator: 2,
    message: "A post by james",
    createdAt: new Date(),
  },
  {
    id: 3,
    creator: 2,
    message: "Nice weather today in Vancouver",
    createdAt: new Date(),
  },
];
