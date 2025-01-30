'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.authService = void 0;
const bcrypt_1 = __importDefault(require('bcrypt'));
const http_status_1 = __importDefault(require('http-status'));
const config_1 = __importDefault(require('../../config'));
const AppError_1 = __importDefault(require('../../errors/AppError'));
const user_model_1 = require('../user/user.model');
const auth_utils_1 = require('./auth.utils');
const loginUser = (payLoad) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.isUserExistByCustomId(
      payLoad === null || payLoad === void 0 ? void 0 : payLoad.email,
    );
    if (!user) {
      throw new AppError_1.default(
        http_status_1.default.NOT_FOUND,
        'This user is not found',
      );
    }
    const isUserBlocked =
      user === null || user === void 0 ? void 0 : user.isBlocked;
    if (isUserBlocked) {
      throw new AppError_1.default(
        http_status_1.default.FORBIDDEN,
        'This user is blocked',
      );
    }
    const matchedPassword = yield bcrypt_1.default.compare(
      payLoad.password,
      user.password,
    );
    if (!matchedPassword) {
      throw new AppError_1.default(
        http_status_1.default.FORBIDDEN,
        'Password do not match',
      );
    }
    const jwtPayload = {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      id: user._id,
      email: user.email,
      role: user.role,
    };
    const token = (0, auth_utils_1.createToken)(
      jwtPayload,
      config_1.default.JWT_ACCESS_SECRET,
      config_1.default.JWT_ACCESS_EXPIRES_IN,
    );
    return {
      token,
    };
  });
const registerUserIntoDb = (payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const newUser = (yield user_model_1.User.create(payload)).toObject();
    const result = {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    };
    return result;
  });
exports.authService = {
  loginUser,
  registerUserIntoDb,
};
