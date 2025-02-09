"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserRgisterValidation = void 0;
const zod_1 = require("zod");
const createUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        email: zod_1.z.string(),
        password: zod_1.z.string(),
        isblocked: zod_1.z.boolean().optional(),
    }),
});
exports.createUserRgisterValidation = {
    createUserValidationSchema,
};
