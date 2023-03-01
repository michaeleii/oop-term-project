import IPost from "../interfaces/post.interface";

export const Posts: IPost[] = [
  {
    id: "abc1",
    userId: "billgates",
    message: "Microsoft is a nice company",
    createdAt: new Date(),
  },
  {
    id: "abc3",
    userId: "james123",
    message: "A post by james",
    createdAt: new Date(),
  },
  {
    id: "abc5",
    userId: "james123",
    message: "Nice weather today in Vancouver",
    createdAt: new Date(),
  },
];
