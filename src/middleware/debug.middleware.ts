import { database } from "../model/fakeDB";

export const debuggerMiddleware = (req, res, next) => {
  const DEBUG_DATABASE = true;
  if (req.session) {
    console.log(`Session Details:`);
    console.log(`${req.session}`);
  }
  if (req.user) {
    console.log(`User Details:`);
    console.log(`${req.user}`);
  }
  if (DEBUG_DATABASE) {
    console.log(`Database Details:`);
    console.log(database);
  }
  next();
};
