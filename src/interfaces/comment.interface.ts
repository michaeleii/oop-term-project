interface IComment {
  id: number;
  postId: number;
  creatorId: number;
  message: string;
  createdAt: Date;
}

export default IComment;
