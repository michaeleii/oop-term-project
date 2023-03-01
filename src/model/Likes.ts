interface Like {
      id: string;
      userId: string;
      postId: string;
      liked: boolean;
    }
    
    const likes: Like[] = [];
    
    export { Like, likes };
    