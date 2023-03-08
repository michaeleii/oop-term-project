// import { database } from "../model/fakeDB";
import DBClient from "../PrismaClient";

const debuggerMiddleware = async (req, res, next) => {
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
    const db = DBClient.getInstance();
    console.log(`Database Details:`);
  }
  next();
};
export default debuggerMiddleware;
