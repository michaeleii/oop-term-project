interface IComment {
  id: string;
  postId: string;
  creatorId: string;
  message: string;
  createdAt: Date;
}

export default IComment;
