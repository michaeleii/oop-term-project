interface IComment {
  id: number;
  postId: number;
  creator: number;
  message: string;
  createdAt: Date;
}

export default IComment;
