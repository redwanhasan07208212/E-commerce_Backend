"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validate_1 = __importDefault(require("../../middlewares/validate"));
const user_constant_1 = require("../user/user.constant");
const blog_controller_1 = require("./blog.controller");
const blog_validation_1 = require("./blog.validation");
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)(user_constant_1.USER_ROLE.user), (0, validate_1.default)(blog_validation_1.blogModelValidation.blogModelSchema), blog_controller_1.blogController.createBlog);
router.patch('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.user), (0, validate_1.default)(blog_validation_1.blogModelValidation.blogModelUpdateSchema), blog_controller_1.blogController.updateBlogs);
router.delete('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.user), blog_controller_1.blogController.deleteBlogs);
router.get('/', blog_controller_1.blogController.getAllBlogs);
exports.blogRoutes = router;
