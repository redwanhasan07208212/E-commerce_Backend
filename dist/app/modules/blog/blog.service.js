"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const queryBuilder_1 = __importDefault(require("../../builder/queryBuilder"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("../user/user.model");
const blog_constant_1 = require("./blog.constant");
const blog_model_1 = require("./blog.model");
const createBlogIntoDb = (author, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const authorExist = yield user_model_1.User.findById(author);
    if (!authorExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Author not found');
    }
    const result = (yield blog_model_1.Blog.create(Object.assign(Object.assign({}, payload), { author }))).populate({
        path: 'author',
        select: '-role -isBlocked',
    });
    return result;
});
const getAllBlogIntoDb = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const blogQuery = new queryBuilder_1.default(blog_model_1.Blog.find().populate({
        path: 'author',
        select: '-role -isBlocked',
    }), query)
        .search(blog_constant_1.blogSearchAbleFields)
        .filter()
        .paginate()
        .sort()
        .fields();
    const result = blogQuery.modelQuery;
    return result;
});
const updateBlogIntoDb = (id, author, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const blogExist = yield blog_model_1.Blog.findById(id);
    if (!blogExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Blog not found');
    }
    const isAuthorExist = yield user_model_1.User.findById(author);
    if (!isAuthorExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Author not found');
    }
    const isAuthorBlog = blogExist.author.toString() === author.toString();
    if (!isAuthorBlog) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Can Not update other's blog");
    }
    const result = yield blog_model_1.Blog.findOneAndUpdate({ _id: id }, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteBlogIntoDb = (id, author) => __awaiter(void 0, void 0, void 0, function* () {
    const blogExist = yield blog_model_1.Blog.findById(id);
    if (!blogExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Blog not found');
    }
    const isAuthorExist = yield user_model_1.User.findById(author);
    if (!isAuthorExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Author not found');
    }
    const isAuthorBlog = blogExist.author.toString() === author.toString();
    if (!isAuthorBlog) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Can Not delete other's blog");
    }
    const result = yield blog_model_1.Blog.findByIdAndDelete(id);
    return result;
});
exports.blogService = {
    createBlogIntoDb,
    getAllBlogIntoDb,
    updateBlogIntoDb,
    deleteBlogIntoDb,
};
