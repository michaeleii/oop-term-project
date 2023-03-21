import express from "express";
import errorMiddleware from "./middleware/error.middleware";
import Controller from "./interfaces/controller.interface";
import dotenv from "dotenv";
import debuggerMiddleware from "./middleware/debug.middleware";
import { displayError, displaySuccess } from "./middleware/error.success.messages.middleware";

class App {
  private _app: express.Application;
  private readonly _port: number | string = process.env.PORT || 8000;

  constructor(controllers: Controller[]) {
    this._app = express();
    dotenv.config();

    this.initializeDebugging();
    this.initializeMiddlewares();
    this.initializeErrorSuccessMessages();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }

  public start() {
    this._app.listen(this._port, () => {
      console.log(`App listening on the port ${this._port}`);
    });
  }

  private initializeMiddlewares() {
    require("./middleware/express.middlewares")(this._app);
    require("./middleware/passport.middlewares")(this._app);
  }

  private initializeErrorHandling() {
    this._app.use(errorMiddleware);
  }
  private initializeDebugging() {
    this._app.use(debuggerMiddleware);
  }

  private initializeErrorSuccessMessages() {
    this._app.use(displayError);
    this._app.use(displaySuccess);
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this._app.use("/", controller.router);
    });
  }
}

export default App;
