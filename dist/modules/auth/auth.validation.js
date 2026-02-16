"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidationSchema = void 0;
const zod_1 = require("zod");
const authValidation = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: 'Email is required',
        }),
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
    }),
});
const registerValidation = zod_1.z.object({
    body: zod_1.z.object({
        firstName: zod_1.z.string({
            required_error: 'First name is required',
        }),
        lastName: zod_1.z.string({
            required_error: 'Last name is required',
        }),
        email: zod_1.z.string({
            required_error: 'Email is required',
        }),
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
        phoneNumber: zod_1.z.string().optional(),
        homeAddress: zod_1.z.string().optional(),
        city: zod_1.z.string().optional(),
        region: zod_1.z.string().optional(),
        companyName: zod_1.z.string().optional(),
        location: zod_1.z.string().optional(),
        role: zod_1.z.enum(['owner', 'employer']).optional(),
    }),
});
exports.authValidationSchema = {
    authValidation,
    registerValidation,
};
