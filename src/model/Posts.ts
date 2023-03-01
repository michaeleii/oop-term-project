import IPost from "../interfaces/post.interface";

export const Posts: IPost[] = [
  {
    id: 1,
    creator: 1,
    message: "Microsoft is a nice company",
    createdAt: new Date("2012-01-09T11:25:13Z"),
  },
  {
    id: 2,
    creator: 2,
    message: "A post by james",
    createdAt: new Date("2012-01-05T04:13:24Z"),
  },
  {
    id: 3,
    creator: 2,
    message: "Nice weather today in Vancouver",
    createdAt: new Date("2012-02-05T05:13:24Z"),
  },
];
