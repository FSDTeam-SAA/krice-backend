"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const config_1 = __importDefault(require("../config/config"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const logger_1 = __importDefault(require("../logger"));
const tokenGenerate_1 = require("../utils/tokenGenerate");
const auth = (...roles) => {
    return (req, res, next) => {
        try {
            const extractedToken = req.headers.authorization;
            const token = extractedToken?.split(' ')[1];
            if (!token) {
                throw new AppError_1.default('Invalid token', http_status_codes_1.StatusCodes.UNAUTHORIZED);
            }
            const verifyUserData = (0, tokenGenerate_1.verifyToken)(token, config_1.default.JWT_SECRET);
            req.user = verifyUserData;
            if (roles.length && !roles.includes(verifyUserData.role)) {
                throw new AppError_1.default('You are not authorized!', http_status_codes_1.StatusCodes.UNAUTHORIZED);
            }
            next();
        }
        catch (error) {
            logger_1.default.error('Authorization error:', error);
            // Provide more specific error messages
            if (error.name === 'JsonWebTokenError') {
                throw new AppError_1.default('Invalid token', http_status_codes_1.StatusCodes.UNAUTHORIZED);
            }
            else if (error.name === 'TokenExpiredError') {
                throw new AppError_1.default('Token has expired', http_status_codes_1.StatusCodes.UNAUTHORIZED);
            }
            else if (error instanceof AppError_1.default) {
                throw error;
            }
            else {
                throw new AppError_1.default('You are not authorized', http_status_codes_1.StatusCodes.UNAUTHORIZED);
            }
        }
    };
};
exports.default = auth;
