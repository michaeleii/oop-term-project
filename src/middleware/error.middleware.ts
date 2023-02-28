import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/HttpException";
import { appendFile } from "fs/promises";
import DateFormatter from "../helper/DateFormatter";
import Path from "../helper/pathJoiner";

const errorMiddleware = async (error: HttpException, request: Request, response: Response, next: NextFunction) => {
  const status = error.status || 500;
  const message = error.message || "An error has occured";

  const currentDate = DateFormatter.format(new Date(Date.now()));
  const errorLog = `${currentDate} - ${status} - ${message}`;
  console.log(status, message);
  await appendFile(Path.errorLog, errorLog);
  next();
};

export default errorMiddleware;
