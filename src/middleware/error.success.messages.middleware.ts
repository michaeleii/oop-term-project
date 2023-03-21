import { Request, Response, NextFunction } from "express";

declare module "express-session" {
  interface SessionData {
    messages: string[];
    success: string;
  }
}

export const displayError = (req: Request, res: Response, next: NextFunction) => {
  res.locals.error = req.session.messages ? req.session.messages[0] : false;
  req.session.messages = [];
  next();
};

export const displaySuccess = (req: Request, res: Response, next: NextFunction) => {
  res.locals.success = req.session.success ? req.session.success : false;
  req.session.success = "";
  next();
};
