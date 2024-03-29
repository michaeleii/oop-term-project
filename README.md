# DevHouse

## About

DevHouse is a social media platform for developers to share their projects and ideas. Users can create posts, follow other users, and like posts. Users can also search for other users and posts.

## Installation

### 1. Install Dependencies

```bash
npm install
```

### 2. Generate Prisma Client

```bash
npx prisma generate
```

### 3. Create a `.env` file

```bash
touch .env
```

If you want to know what to put in the `.env` file, check out the `.env.example` file.

### 4. Run the Application

```bash
npm start
```

### 5. View the database

```bash
npx prisma studio
```

### 6. Try logging in to a user

Since we used bcrypt to hash the passwords, you can use the following password to log in to a sample user.

```text
password: icecream123!
```

## Breakdown of Work

## Feb 27 (First Sprint Complete)

### Together

We worked on the following tasks:

1. Configure Redis for our application
   - This task is responsible for adding Redis to the project.

We researched on Youtube and Google the following things:

1. [Connect-Redis Documentation](https://www.npmjs.com/package/connect-redis)
2. [ioredis Documentation](https://www.npmjs.com/package/ioredis)

### Michael Lei

I worked on the following tasks:

1. Implement Login
   - This task is responsible for logging in users.
2. Implement Logout
   - This task is responsible for logging users out.

### Brian

I worked on the following tasks:

1. Add content to a Section 4 on the homepage.
   - This task is responsible for adding content to the homepage.
2. Add image to the homepage.
   - This task is responsible for adding content to the homepage.

### Hani

I worked on the following tasks:

1. Add content to Section 3 on the homepage.
   - This task is responsible for adding content to the homepage.

## Feb 28 (Second Sprint Complete)

### Michael Lei

I worked on the following tasks:

1. Implement Register
   - This task is responsible for registering users.
2. Implement Error Messages
   - This task is responsible for displaying error messages on the login and sign up page as well in the appending the errors to the error.log file.

### Brian

I worked on the following tasks:

1. Normalize the database
   - This task is responsible for making data in the database easily accessible.

### Hani

I worked on the following tasks:

1. Create Settings EJS Page
   - This task is responsible for showing users a settings page when users click on settings.

## Mar 1 (Third Sprint Complete)

### Michael Lei

I worked on the following tasks:

1. Implement Search
   - This task is responsible for searching for users and posts.
2. Implement Likes

   - This task is responsible for liking posts.

3. Implement Follow
   - This task is responsible for following users.

### Brian

I worked on the following tasks:

1. Implement Search
   - This task is responsible for searching for users and posts.
2. Implement Likes

   - This task is responsible for liking posts.

3. Implement Follow
   - This task is responsible for following users.

### Hani

I worked on the following tasks:

1. Implement Search
   - This task is responsible for searching for users and posts.
2. Implement Likes

   - This task is responsible for liking posts.

3. Implement Follow
   - This task is responsible for following users.

## Mar 6 (Fourth Sprint Complete)

### Michael Lei

1. Implement Following posts page
   - This task is responsible for showing users a page of their follower posts.

### Brian

1. Create Prisma Schema
   - This task is responsible for creating a schema for the database.

## Mar 7 (Fifth Sprint Complete)

### Michael Lei

1. Intergrate Prisma
   - This task is responsible for integrating Prisma methods into the project.
