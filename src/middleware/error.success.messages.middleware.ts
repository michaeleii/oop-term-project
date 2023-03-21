declare module "express-session" {
  interface SessionData {
    messages: string[];
    success: string;
  }
}

export const displayError = (req, res, next) => {
  [res.locals.error] = req.session.messages;
  req.session.messages = [];
};

export const displaySuccess = (req, res, next) => {
  res.locals.success = req.session.success;
  req.session.success = "";
};
