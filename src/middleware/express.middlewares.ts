import express from "express";
import path from "path";
import session from "express-session";
import morgan from "morgan";
import * as dotenv from "dotenv";
dotenv.config();

let RedisStore = require("connect-redis")(session);
const Redis = require("ioredis");

const REDIS_PASSWORD = process.env.REDIS_PASSWORD as string;
const REDIS_HOST = process.env.REDIS_HOST as string;
const REDIS_PORT = process.env.REDIS_PORT as string;

let redisClient = new Redis({
  port: REDIS_PORT, // Redis port
  host: REDIS_HOST, // Redis host
  password: REDIS_PASSWORD,
});

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
      store: new RedisStore({ client: redisClient }),
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
