import * as express from "express";
import Joi from "joi";
import { getMongoRepository } from "typeorm";
import { User } from "../entity/User";
import { validate } from "../middlewares/validator";
import multer from "multer";
import { BadRequest } from "../middlewares/errorHandler";
import * as jwt from "jsonwebtoken";

export class UserController {
  public path = "/user";
  public router = express.Router();
  private tokenSecret = process.env.TOKEN_SECRET;
  public upload = multer({
    dest: "uploads/",
  });

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.post(
      this.path + "/signup",
      this.upload.single("image"),
      validate(
        Joi.object({
          name: Joi.string().alphanum().min(3).required(),
          password: Joi.string()
            .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
            .required(),
          email: Joi.string().email().required(),
        })
      ),
      this.signup.bind(this)
    );
    this.router.get(this.path + "/list", this.getUsers);
    this.router.post(
      this.path + "/signin",
      validate(
        Joi.object({
          email: Joi.string().email().required(),
          password: Joi.string()
            .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
            .required(),
        })
      ),
      this.signin.bind(this)
    );
  }

  async signin(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const body = req.body;
      const userRepository = getMongoRepository(User);
      const user = await userRepository.findOne({ email: body.email });
      if (!user || user.password !== body.password) {
        return next(
          new BadRequest("Invalid email address or password. Please try again")
        );
      }
      delete user.password;
      const token = this.generateToken(user);
      res.json({
        ...user,
        token,
        image: req.header("host") + "/" + user.image,
      });
      next();
    } catch (e) {
      next(e);
    }
  }

  async signup(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const body = req.body;
      const userRepository = getMongoRepository(User);
      const userByEmail = await userRepository.findOne({ email: body.email });
      if (userByEmail) {
        return next(
          new BadRequest(
            "Email already exists. Please use different email address"
          )
        );
      }
      const user = await userRepository.save({
        name: body.name,
        email: body.email,
        password: body.password,
        image: req.file.path,
      });
      delete user.password;
      const token = this.generateToken(user);
      res.json({
        ...user,
        token,
        image: req.header("host") + "/" + user.image,
      });
      next();
    } catch (e) {
      next(e);
    }
  }

  async getUsers(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const userRepository = getMongoRepository(User);
      const users = await userRepository.find();
      res.json(users);
      next();
    } catch (e) {
      next(e);
    }
  }

  private generateToken(payload: any) {
    return jwt.sign(
      {
        ...payload,
        id: payload.id.toString(),
      },
      this.tokenSecret,
      { expiresIn: "24h" }
    );
  }
}
