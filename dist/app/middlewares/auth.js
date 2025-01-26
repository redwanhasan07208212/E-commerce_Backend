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
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const user_model_1 = require("../modules/user/user.model");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const auth = (...requiredRoles) => (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const bearerToken = req.headers.authorization;
    //console.log(token);
    // check if the token was sent from the client
    if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not Authorized');
    }
    const token = bearerToken.split(' ')[1];
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.JWT_ACCESS_SECRET);
    const { role, userEmail } = decoded;
    const user = yield user_model_1.User.isUserExistByCustomId(userEmail);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This user is not found');
    }
    const isUserBlocked = user === null || user === void 0 ? void 0 : user.isBlocked;
    if (isUserBlocked) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This user is blocked');
    }
    if (requiredRoles && !requiredRoles.includes(role)) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not Authorized');
    }
    req.user = decoded;
    next();
}));
exports.default = auth;
