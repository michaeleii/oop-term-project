interface User {
      id: string;
      username: string;
      email: string;
      password: string;
      firstName: string;
      lastName: string;
    }
    
    const users: User[] = [
      {
        id: "1",
        username: "billgates",
        email: "gates@gmail.com",
        password: "gates123!",
        firstName: "Bill",
        lastName: "Gates",
      },
      {
        id: "2",
        username: "james123",
        email: "james123@gmail.com",
        password: "james123!",
        firstName: "James",
        lastName: "Smith",
      },
    ];
    
    export { User, users };
    