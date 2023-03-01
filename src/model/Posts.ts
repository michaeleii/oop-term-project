interface Post {
      id: string;
      postCreatorId: string;
      createdAt: Date;
    }
    
    const posts: Post[] = [
      {
        id: "abc1",
        postCreatorId: "billgates",
        createdAt: new Date(),
      },
      {
        id: "abc3",
        postCreatorId: "james123",
        createdAt: new Date(),
      },
      {
        id: "abc5",
        postCreatorId: "james123",
        createdAt: new Date(),
      },
    ];
    
    export { Post, posts };
    