import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const main = async () => {
  console.log("Seeding database...");
  const users = [];
  // Create 100 random users.
  for (let i = 0; i < 100; i++) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.internet.email(firstName, lastName);
    const password = faker.internet.password(8);
    const username = faker.internet.userName(firstName, lastName);
    const user = await prisma.user.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        username: username,
      },
    });
    users.push(user);
  }
  // Create 50 posts for a random user.
  const posts = [];
  for (let i = 0; i < 100; i++) {
    const user = users[Math.floor(Math.random() * users.length)];
    const message = faker.lorem.sentence();
    const post = await prisma.post.create({
      data: {
        message: message,
        creator: {
          connect: {
            id: user.id,
          },
        },
      },
    });
    posts.push(post);
  }
  // Create 100 comments for a random post.
  // Generate random comments for a random subset of posts and users
  for (let i = 0; i < 100; i++) {
    const user = users[Math.floor(Math.random() * users.length)];
    const post = posts[Math.floor(Math.random() * posts.length)];
    const message = faker.lorem.sentence();
    await prisma.comment.create({
      data: {
        message: message,
        creator: {
          connect: {
            id: user.id,
          },
        },
        Post: {
          connect: {
            id: post.id,
          },
        },
      },
    });
  }
  console.log("Finished seeding database");
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
