"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDriver = exports.isAdmin = exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const user_model_1 = require("../modules/user/user.model");
const protect = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token)
        throw new AppError_1.default('Token not found', http_status_1.default.NOT_FOUND);
    try {
        const decoded = (await jsonwebtoken_1.default.verify(token, process.env.JWT_ACCESS_SECRET));
        // console.log(decoded)
        const user = await user_model_1.User.findById(decoded._id);
        if (user) {
            req.user = user;
        }
        next();
    }
    catch (err) {
        throw new AppError_1.default('Invalid token', 401);
    }
};
exports.protect = protect;
const isAdmin = (req, res, next) => {
    if (req.user?.role !== 'admin') {
        throw new AppError_1.default('Access denied. You are not an admin.', 403);
    }
    next();
};
exports.isAdmin = isAdmin;
const isDriver = (req, res, next) => {
    if (req.user?.role !== 'driver') {
        throw new AppError_1.default('Access denied. You are not an driver.', 403);
    }
    next();
};
exports.isDriver = isDriver;
