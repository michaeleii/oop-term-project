import IComment from "../interfaces/comment.interface";

export const Comments: IComment[] = [
  {
    id: "1",
    createdAt: "2012-01-09T11:25:13Z",
    userId: "billgates",
    message: "this is some random comment",
  },
  {
    id: "2",
    createdAt: "2012-01-05T04:13:24Z",
    userId: "billgates",
    message: "Cool post james. Glad I decided to follow you.",
  },
  {
    id: "3",
    userId: "billgates",
    createdAt: "2012-02-05T05:13:24Z",
    message: "The weather is always nice when you're rich like me.",
  },
];
