"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = __importStar(require("express"));
var joi_1 = __importDefault(require("joi"));
var typeorm_1 = require("typeorm");
var Post_1 = require("../entity/Post");
var validator_1 = require("../middlewares/validator");
var multer_1 = __importDefault(require("multer"));
var errorHandler_1 = require("../middlewares/errorHandler");
var PostController = /** @class */ (function () {
    function PostController() {
        this.path = "/post";
        this.router = express.Router();
        this.upload = multer_1.default({
            dest: "uploads/posts/",
        });
        this.intializeRoutes();
    }
    PostController.prototype.intializeRoutes = function () {
        this.router.post(this.path, this.upload.single("image"), validator_1.validate(joi_1.default.object({
            title: joi_1.default.string().min(3).required(),
            description: joi_1.default.string().required(),
        })), this.createPost);
        this.router.get("/posts", this.getPosts);
        this.router.get(this.path + "/:id", this.getPostById);
        this.router.put(this.path + "/:id", this.upload.single("image"), validator_1.validate(joi_1.default.object({
            title: joi_1.default.string().min(3).required(),
            description: joi_1.default.string().required(),
        })));
        this.router.delete(this.path + "/:id", this.removePost);
    };
    PostController.prototype.getPosts = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var postRepository, posts, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        postRepository = typeorm_1.getMongoRepository(Post_1.Post);
                        return [4 /*yield*/, postRepository.find()];
                    case 1:
                        posts = _a.sent();
                        res.json(posts);
                        next();
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        next(e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PostController.prototype.createPost = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var body, postRepository, user, post, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        body = req.body;
                        postRepository = typeorm_1.getMongoRepository(Post_1.Post);
                        user = req.user;
                        return [4 /*yield*/, postRepository.save({
                                title: body.title,
                                description: body.description,
                                userId: user.id,
                                user: user,
                                image: req.file.path,
                            })];
                    case 1:
                        post = _a.sent();
                        res.json(__assign({}, post, { image: req.header("host") + "/" + post.image }));
                        next();
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _a.sent();
                        next(e_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PostController.prototype.removePost = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, user, postRepository, post, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        id = req.params.id;
                        user = req.user;
                        postRepository = typeorm_1.getMongoRepository(Post_1.Post);
                        return [4 /*yield*/, postRepository.findOne(req.params.id)];
                    case 1:
                        post = _a.sent();
                        if (!post) {
                            return [2 /*return*/, next(new errorHandler_1.NotFound("Invalid post id provided"))];
                        }
                        else if (post.userId !== user.id) {
                            return [2 /*return*/, next(new errorHandler_1.BadRequest("You can only delete your own post"))];
                        }
                        return [4 /*yield*/, postRepository.delete(post)];
                    case 2:
                        _a.sent();
                        res.json({});
                        next();
                        return [3 /*break*/, 4];
                    case 3:
                        e_3 = _a.sent();
                        next(e_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PostController.prototype.updatePost = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var body, user, postRepository, post, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        body = req.body;
                        user = req.user;
                        postRepository = typeorm_1.getMongoRepository(Post_1.Post);
                        return [4 /*yield*/, postRepository.findOne(req.params.id)];
                    case 1:
                        post = _a.sent();
                        if (!post) {
                            return [2 /*return*/, next(new errorHandler_1.NotFound("Invalid post id provided"))];
                        }
                        else if (post.userId !== user.id) {
                            return [2 /*return*/, next(new errorHandler_1.BadRequest("You can only update your own post"))];
                        }
                        post.title = body.title;
                        post.description = body.description;
                        if (req.file.path) {
                            post.image = req.file.path;
                        }
                        return [4 /*yield*/, postRepository.save(post)];
                    case 2:
                        _a.sent();
                        res.json(__assign({}, post, { image: req.header("host") + "/" + post.image }));
                        next();
                        return [3 /*break*/, 4];
                    case 3:
                        e_4 = _a.sent();
                        next(e_4);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PostController.prototype.getPostById = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, postRepository, post, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = req.params.id;
                        postRepository = typeorm_1.getMongoRepository(Post_1.Post);
                        return [4 /*yield*/, postRepository.findOne(id)];
                    case 1:
                        post = _a.sent();
                        if (!post) {
                            return [2 /*return*/, next(new errorHandler_1.NotFound("Invalid post id provided"))];
                        }
                        res.json(post);
                        next();
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        next(err_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return PostController;
}());
exports.PostController = PostController;
//# sourceMappingURL=postController.js.map