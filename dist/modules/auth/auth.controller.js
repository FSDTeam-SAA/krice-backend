"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const auth_service_1 = __importDefault(require("./auth.service"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const login = (0, catchAsync_1.default)(async (req, res) => {
    const result = await auth_service_1.default.login(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'You have logged in successfully.',
        data: result,
    });
});
const register = (0, catchAsync_1.default)(async (req, res) => {
    const result = await auth_service_1.default.register(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        success: true,
        message: 'Registration successful.',
        data: result,
    });
});
const refreshToken = (0, catchAsync_1.default)(async (req, res) => {
    const { refreshToken } = req.cookies;
    const result = await auth_service_1.default.refreshToken(refreshToken);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Access token refreshed successfully',
        data: result,
    });
});
const forgotPassword = (0, catchAsync_1.default)(async (req, res) => {
    const { email } = req.body;
    const result = await auth_service_1.default.forgotPassword(email);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'OTP sent to your email',
        data: result,
    });
});
const resendForgotOtpCode = (0, catchAsync_1.default)(async (req, res) => {
    const email = req.user?.email;
    if (!email) {
        throw new AppError_1.default('Unauthorized', http_status_codes_1.StatusCodes.UNAUTHORIZED);
    }
    await auth_service_1.default.resendForgotOtpCode(email);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'OTP resent successfully',
        data: null,
    });
});
const verifyOtp = (0, catchAsync_1.default)(async (req, res) => {
    const { otp } = req.body;
    const email = req.user?.email;
    if (!email) {
        throw new AppError_1.default('Unauthorized', http_status_codes_1.StatusCodes.UNAUTHORIZED);
    }
    const result = await auth_service_1.default.verifyOtp(email, otp);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'OTP verified successfully',
        data: result,
    });
});
const resetPassword = (0, catchAsync_1.default)(async (req, res) => {
    const email = req.user?.email;
    if (!email) {
        throw new AppError_1.default('Unauthorized', http_status_codes_1.StatusCodes.UNAUTHORIZED);
    }
    const result = await auth_service_1.default.resetPassword(req.body, email);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Password reset successfully',
        data: result,
    });
});
const changePassword = (0, catchAsync_1.default)(async (req, res) => {
    const email = req.user?.email;
    if (!email) {
        throw new AppError_1.default('Unauthorized', http_status_codes_1.StatusCodes.UNAUTHORIZED);
    }
    const result = await auth_service_1.default.changePassword(req.body, email);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Password changed successfully',
        data: result,
    });
});
const authController = {
    login,
    register,
    refreshToken,
    forgotPassword,
    resendForgotOtpCode,
    verifyOtp,
    resetPassword,
    changePassword,
};
exports.default = authController;
