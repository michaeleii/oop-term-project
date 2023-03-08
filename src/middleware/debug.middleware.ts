const debuggerMiddleware = async (req, res, next) => {
  const DEBUG_DATABASE = false;
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
  }
  next();
};
export default debuggerMiddleware;
