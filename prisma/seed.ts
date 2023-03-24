import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const main = async () => {
  console.log("Seeding database...");
  const users = [];
  // Create 30 random users.
  for (let i = 0; i < 30; i++) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.internet.email(firstName, lastName);
    const password = await bcrypt.hash("icecream123!", 10);
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
  // Generate random followers and following
  const followerPairs = new Set();
  while (followerPairs.size < 100) {
    const follower = faker.helpers.arrayElement(users);
    const following = faker.helpers.arrayElement(users.filter((u) => u.id !== follower.id));
    const pair = `${follower.id}-${following.id}`;
    if (!followerPairs.has(pair)) {
      await prisma.follower.create({
        data: {
          userId: follower.id,
          followingId: following.id,
        },
      });
      followerPairs.add(pair);
    }
  }
  // Create 100 random posts by random users.
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
  // Create 200 random comments for random posts by random users.
  for (let i = 0; i < 200; i++) {
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
