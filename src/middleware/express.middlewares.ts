import express from "express";
import path from "path";
import session from "express-session";
import morgan from "morgan";
import * as dotenv from "dotenv";
dotenv.config();

// (async () => {
//   const myPlaintextPassword = "gates123!";
//   const saltRounds = 10;
//   const hash = await bcrypt.hash(myPlaintextPassword, saltRounds);
//   const match = await bcrypt.compare(myPlaintextPassword, hash);
//   console.log(hash);
//   console.log(match);
// })();

declare module "dotenv" {
  interface ProcessEnv {
    REDIS_PASSWORD: string;
    REDIS_HOST: string;
    REDIS_PORT: string;
    NODE_ENV: string;
  }
}

let { NODE_ENV, REDIS_PASSWORD, REDIS_HOST, REDIS_PORT } = process.env;
let sessionStore = new session.MemoryStore();

if (NODE_ENV === "production") {
  let RedisStore = require("connect-redis")(session);
  const Redis = require("ioredis");
  let redisClient = new Redis({
    port: REDIS_PORT,
    host: REDIS_HOST,
    password: REDIS_PASSWORD,
  });
  sessionStore = new RedisStore({ client: redisClient });
}

module.exports = (app) => {
  // Static File Serving and Post Body Parsing
  app.use(express.static(path.join(__dirname, "..", "public")));
  app.use(express.urlencoded({ extended: true }));
  app.set("views", path.join(__dirname, "..", "areas"));
  app.set("view engine", "ejs");

  // Logging Middleware
  app.use(morgan("tiny"));

  // Session Configuration
  app.use(
    session({
      store: sessionStore,
      secret: "secret",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
      },
    })
  );
};
