"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var app_1 = __importDefault(require("./app"));
var userController_1 = require("./controllers/userController");
var postController_1 = require("./controllers/postController");
// initialize configuration
dotenv_1.default.config();
// port is now available to the Node.js runtime
// as if it were an environment variable
var port = process.env.SERVER_PORT;
var app = new app_1.default([
    new userController_1.UserController(),
    new postController_1.PostController()
], port);
app.listen();
//# sourceMappingURL=index.js.map