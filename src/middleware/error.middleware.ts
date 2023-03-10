import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/HttpException";
import { appendFile } from "fs/promises";
import DateFormatter from "../helper/DateFormatter";
import Path from "../helper/pathJoiner";
import { EOL } from "os";

const errorMiddleware = async (err: HttpException, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  const message = err.message || "An error has occured";

  const currentDate = DateFormatter.format(new Date(Date.now()));
  const errorLog = `${currentDate} - ${status} - ${message} ${EOL}`;
  console.log(status, message);
  await appendFile(Path.errorLog, errorLog);
};

export default errorMiddleware;
