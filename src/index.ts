import dotenv from "dotenv";
import App from "./app";
import { UserController } from "./controllers/userController";
import { PostController } from "./controllers/postController";

// initialize configuration
dotenv.config();

// port is now available to the Node.js runtime
// as if it were an environment variable
const port = process.env.SERVER_PORT;

const app = new App([
    new UserController(),
    new PostController()
], port);

app.listen();
