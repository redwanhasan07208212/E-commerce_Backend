"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoute = void 0;
const express_1 = __importDefault(require("express"));
const validate_1 = __importDefault(require("../../middlewares/validate"));
const user_validation_1 = require("../user/user.validation");
const auth_controller_1 = require("./auth.controller");
const auth_validation_1 = require("./auth.validation");
const router = express_1.default.Router();
router.post('/login', (0, validate_1.default)(auth_validation_1.AuthValidation.LoginValidationSchema), auth_controller_1.AuthControllers.loginUser);
router.post('/register', (0, validate_1.default)(user_validation_1.createUserRgisterValidation.createUserValidationSchema), auth_controller_1.AuthControllers.registerUser);
exports.AuthRoute = router;
