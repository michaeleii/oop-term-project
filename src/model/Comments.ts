interface Comment {
      id: string;
      message: string;
      commentCreatorId: string;
      postId: string;
      createdAt: Date;
    }
    
    const comments: Comment[] = [
      {
        id: "abc2",
        message: "this is some random comment",
        commentCreatorId: "billgates",
        postId: "abc1",
        createdAt: new Date("2012-01-09T11:25:13Z"),
      },
      {
        id: "abc4",
        message: "Cool post james. Glad I decided to follow you.",
        commentCreatorId: "billgates",
        postId: "abc3",
        createdAt: new Date("2012-01-05T04:13:24Z"),
      },
      {
        id: "abc6",
        message: "The weather is always nice when you're rich like me.",
        commentCreatorId: "billgates",
        postId: "abc5",
        createdAt: new Date("2012-02-05T05:13:24Z"),
      },
    ];
    
    export { Comment, comments };
    