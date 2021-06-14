import * as express from "express";
import Joi from "joi";
import { getMongoRepository } from "typeorm";
import { Post } from "../entity/Post";
import { validate } from "../middlewares/validator";
import multer from "multer";
import { BadRequest, NotFound } from "../middlewares/errorHandler";
import {ObjectID} from "typeorm";

export class PostController {
  public path = "/post";
  public router = express.Router();
  public upload = multer({
    dest: "uploads/posts/",
  });

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.post(
      this.path,
      this.upload.single("image"),
      validate(
        Joi.object({
          title: Joi.string().min(3).required(),
          description: Joi.string().required(),
        })
      ),
      this.createPost
    );
    this.router.get("/posts", this.getPosts);
    this.router.get(this.path + "/:id", this.getPostById);
    this.router.put(
      this.path + "/:id",
      this.upload.single("image"),
      validate(
        Joi.object({
          title: Joi.string().min(3).required(),
          description: Joi.string().required(),
        })
      )
    );
    this.router.delete(this.path + "/:id", this.removePost);
  }

  public async getPosts(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const postRepository = getMongoRepository(Post);
      const posts = await postRepository.find();
      res.json(posts);
      next();
    } catch (e) {
      next(e);
    }
  }

  async createPost(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const body = req.body;
      const postRepository = getMongoRepository(Post);
      const user = req.user as any;

      const post = await postRepository.save({
        title: body.title,
        description: body.description,
        userId: user.id,
        user,
        image: req.file.path,
      });
      res.json({
        ...post,
        image: req.header("host") + "/" + post.image,
      });
      next();
    } catch (e) {
      next(e);
    }
  }

  async removePost(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const id = req.params.id;
      const user = req.user as any;
      const postRepository = getMongoRepository(Post);
      const post = await postRepository.findOne(req.params.id);
      if (!post) {
        return next(new NotFound("Invalid post id provided"));
      } else if (post.userId !== user.id) {
        return next(new BadRequest("You can only delete your own post"));
      }

      await postRepository.delete(post);
      res.json({});
      next();
    } catch(e) {
      next(e);
    }

  }

  async updatePost(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const body = req.body;
      const user = req.user as any;
      const postRepository = getMongoRepository(Post);
      const post = await postRepository.findOne(req.params.id);
      if (!post) {
        return next(new NotFound("Invalid post id provided"));
      } else if (post.userId !== user.id) {
        return next(new BadRequest("You can only update your own post"));
      }

      post.title = body.title;
      post.description = body.description;
      if (req.file.path) {
        post.image = req.file.path;
      }
      await postRepository.save(post);

      res.json({
        ...post,
        image: req.header("host") + "/" + post.image,
      });
      next();
    } catch (e) {
      next(e);
    }
  }

  async getPostById(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const id = req.params.id;
      const postRepository = getMongoRepository(Post);
      const post = await postRepository.findOne(id);
      if (!post) {
        return next(new NotFound("Invalid post id provided"));
      }
      res.json(post);
      next();
    } catch (err) {
      next(err);
    }
  }
}
