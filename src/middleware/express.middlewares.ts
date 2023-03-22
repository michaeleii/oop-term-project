import express from "express";
import path from "path";
import session from "express-session";
import morgan from "morgan";
import * as dotenv from "dotenv";
import redisStore from "connect-redis";
dotenv.config();

declare module "dotenv" {
  interface ProcessEnv {
    REDIS_PASSWORD: string;
    REDIS_HOST: string;
    REDIS_PORT: string;
    NODE_ENV: string;
  }
}

let { NODE_ENV, REDIS_PASSWORD, REDIS_HOST, REDIS_PORT } = process.env;
type SessionStore = session.MemoryStore | redisStore.RedisStore;
let sessionStore: SessionStore = new session.MemoryStore();

if (NODE_ENV === "production") {
  let RedisStore = redisStore(session);
  const Redis = require("ioredis");
  let redisClient = new Redis({
    port: REDIS_PORT,
    host: REDIS_HOST,
    password: REDIS_PASSWORD,
  });
  sessionStore = new RedisStore({ client: redisClient });
}

module.exports = (app: express.Application) => {
  // Static File Serving and Post Body Parsing
  app.use(express.static(path.join(__dirname, "..", "public")));
  app.use(express.urlencoded({ extended: true }));
  app.set("views", path.join(__dirname, "..", "areas"));
  app.set("view engine", "ejs");

  // Logging Middleware
  app.use(morgan("dev"));

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
