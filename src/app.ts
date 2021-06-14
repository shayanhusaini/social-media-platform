import * as express from "express";
import { getDb } from "./middlewares/connectDatabase";
import {GeneralError} from "./middlewares/errorHandler";
import expressJwt from 'express-jwt';
import {clientAuth} from './middlewares/clientAuth';

class App {
  public app: express.Application;
  public port: number;

  constructor(controllers, port) {
    this.app = express.default();
    this.port = port;

    this.initializeMiddlewares().then(() => {
        this.initializeControllers(controllers);
        this.app.use((err, req: express.Request, res: express.Response, next: express.NextFunction) => {
          if (err instanceof GeneralError) {
            return res.status(err.code).json({
              message: err.message
            });
          }

          return res.status(500).json({
            message: err.message
          });
        });
    });
  }

  private async initializeMiddlewares() {
    this.app.use(express.urlencoded({extended: true}));
    // this.app.use(express.json());
    this.app.use(clientAuth);
    this.app.use(expressJwt({ secret: process.env.TOKEN_SECRET, algorithms: ['HS256']}).unless({path: ['/api/user/signup', '/api/user/signin']}));
    await getDb();
  }

  private initializeControllers(controllers) {
    controllers.forEach((controller) => {
      this.app.use("/api", controller.router);
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      // tslint:disable-next-line:no-console
      console.log(`App listening on the port ${this.port}`);
    });
  }
}

export default App;
