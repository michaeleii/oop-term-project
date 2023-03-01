interface Follower {
      id: string;
      followerId: string;
      followedId: string;
    }
    
    const followers: Follower[] = [];
    
    export { Follower, followers };
    