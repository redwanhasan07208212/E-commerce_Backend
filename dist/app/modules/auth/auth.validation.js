"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const LoginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: 'Email is Required' }),
        password: zod_1.z.string({ required_error: 'Password is Required' }),
    }),
});
exports.AuthValidation = {
    LoginValidationSchema,
};
