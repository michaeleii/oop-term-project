import IComment from "../interfaces/comment.interface";

export const Comments: IComment[] = [
  {
    id: 1,
    postId: 1,
    createdAt: new Date("2012-01-09T11:25:13Z"),
    creator: 1,
    message: "this is some random comment",
  },
  {
    id: 2,
    postId: 2,
    createdAt: new Date("2012-01-05T04:13:24Z"),
    creator: 1,
    message: "Cool post james. Glad I decided to follow you.",
  },
  {
    id: 3,
    postId: 3,
    creator: 1,
    createdAt: new Date("2012-02-05T05:13:24Z"),
    message: "The weather is always nice when you're rich like me.",
  },
];
