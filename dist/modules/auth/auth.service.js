"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_codes_1 = require("http-status-codes");
const config_1 = __importDefault(require("../../config/config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const globalType_1 = require("../../lib/globalType");
const tokenGenerate_1 = require("../../utils/tokenGenerate");
const verificationCodeTemplate_1 = __importDefault(require("../../utils/verificationCodeTemplate"));
const user_model_1 = require("../user/user.model");
const sendEmail_1 = __importDefault(require("../../utils/sendEmail"));
const register = async (payload) => {
    const { email } = payload;
    if (!email) {
        throw new AppError_1.default('Email is required', http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    const existingUser = await user_model_1.User.isUserExistByEmail(email);
    if (existingUser) {
        throw new AppError_1.default('Email already in use', http_status_codes_1.StatusCodes.CONFLICT);
    }
    const newUser = await user_model_1.User.create(payload);
    const tokenPayload = {
        id: newUser._id,
        email: newUser.email,
        role: newUser.role,
    };
    const accessToken = (0, tokenGenerate_1.createToken)(tokenPayload, config_1.default.JWT_SECRET, config_1.default.JWT_EXPIRES_IN);
    const refreshToken = (0, tokenGenerate_1.createToken)(tokenPayload, config_1.default.refreshTokenSecret, config_1.default.jwtRefreshTokenExpiresIn);
    return {
        accessToken,
        refreshToken,
        user: {
            id: newUser._id,
            email: newUser.email,
            role: newUser.role,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            image: newUser.image,
            phoneNumber: newUser.phoneNumber,
            homeAddress: newUser.homeAddress,
            city: newUser.city,
            region: newUser.region,
            location: newUser.location,
        },
    };
};
const login = async (payload) => {
    const { email, password } = payload;
    const user = await user_model_1.User.isUserExistByEmail(email);
    if (!user)
        throw new AppError_1.default('No account found with the provided credentials.', http_status_codes_1.StatusCodes.NOT_FOUND);
    const isPasswordValid = await user_model_1.User.isPasswordMatch(password, user.password);
    if (!isPasswordValid)
        throw new AppError_1.default('Invalid password', http_status_codes_1.StatusCodes.UNAUTHORIZED);
    const tokenPayload = {
        id: user._id,
        email: user.email,
        role: user.role,
    };
    const accessToken = (0, tokenGenerate_1.createToken)(tokenPayload, config_1.default.JWT_SECRET, config_1.default.JWT_EXPIRES_IN);
    const refreshToken = (0, tokenGenerate_1.createToken)(tokenPayload, config_1.default.refreshTokenSecret, config_1.default.jwtRefreshTokenExpiresIn);
    return {
        accessToken,
        refreshToken,
        user: {
            id: user._id,
            email: user.email,
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName,
            image: user.image,
            phoneNumber: user.phoneNumber,
            homeAddress: user.homeAddress,
            city: user.city,
            region: user.region,
            location: user.location,
        },
    };
};
const refreshToken = async (token) => {
    let decodedToken;
    try {
        decodedToken = (0, tokenGenerate_1.verifyToken)(token, config_1.default.refreshTokenSecret);
        if (!decodedToken) {
            throw new AppError_1.default('Invalid token', http_status_codes_1.StatusCodes.UNAUTHORIZED);
        }
    }
    catch {
        throw new AppError_1.default('You are not authorized', http_status_codes_1.StatusCodes.UNAUTHORIZED);
    }
    const email = decodedToken.email;
    const userData = await user_model_1.User.findOne({ email });
    if (!userData) {
        throw new Error('No account found with the provided credentials.');
    }
    const JwtPayload = {
        userId: userData._id,
        role: userData.role,
        email: userData.email,
    };
    const accessToken = (0, tokenGenerate_1.createToken)(JwtPayload, config_1.default.JWT_SECRET, config_1.default.JWT_EXPIRES_IN);
    return { accessToken };
};
const forgotPassword = async (email) => {
    if (!email)
        throw new Error('Email is required');
    const isExistingUser = await user_model_1.User.isUserExistByEmail(email);
    if (!isExistingUser)
        throw new AppError_1.default('No account found with the provided credentials.', http_status_codes_1.StatusCodes.NOT_FOUND);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt_1.default.hash(otp, 10);
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000);
    await user_model_1.User.findByIdAndUpdate(isExistingUser._id, {
        resetPasswordOtp: hashedOtp,
        resetPasswordOtpExpires: otpExpires,
    }, { new: true });
    await (0, sendEmail_1.default)({
        to: isExistingUser.email,
        subject: 'Reset your password',
        html: (0, verificationCodeTemplate_1.default)(otp),
    });
    const JwtToken = {
        userId: isExistingUser._id,
        email: isExistingUser.email,
        role: isExistingUser.role,
    };
    const accessToken = (0, tokenGenerate_1.createToken)(JwtToken, config_1.default.JWT_SECRET, config_1.default.JWT_EXPIRES_IN);
    return { accessToken };
};
const resendForgotOtpCode = async (email) => {
    const existingUser = await user_model_1.User.isUserExistByEmail(email);
    if (!existingUser)
        throw new AppError_1.default('No account found with the provided credentials.', http_status_codes_1.StatusCodes.NOT_FOUND);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt_1.default.hash(otp, 10);
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000);
    await user_model_1.User.findOneAndUpdate({ email }, {
        resetPasswordOtp: hashedOtp,
        resetPasswordOtpExpires: otpExpires,
    }, { new: true }).select('username email role');
    await (0, sendEmail_1.default)({
        to: existingUser.email,
        subject: `${globalType_1.companyName} - Password Reset OTP`,
        html: (0, verificationCodeTemplate_1.default)(otp),
    });
    // return result;
};
const verifyOtp = async (email, otp) => {
    if (!otp) {
        throw new AppError_1.default('OTP is required', http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    const isExistingUser = await user_model_1.User.isUserExistByEmail(email);
    if (!isExistingUser)
        throw new AppError_1.default('No account found with the provided credentials.', http_status_codes_1.StatusCodes.NOT_FOUND);
    if (!isExistingUser.resetPasswordOtp || !isExistingUser.resetPasswordOtpExpires) {
        throw new AppError_1.default('Password reset OTP not requested or has expired', http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    if (isExistingUser.resetPasswordOtpExpires < new Date()) {
        throw new AppError_1.default('Password reset OTP has expired', http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    // test
    const isOtpMatched = await bcrypt_1.default.compare(otp.toString(), isExistingUser.resetPasswordOtp);
    if (!isOtpMatched)
        throw new Error('Invalid OTP');
    await user_model_1.User.findByIdAndUpdate(isExistingUser._id, {
        resetPasswordOtp: '',
        resetPasswordOtpExpires: '',
    }, { new: true });
    const JwtToken = {
        userId: isExistingUser._id,
        email: isExistingUser.email,
        role: isExistingUser.role,
    };
    const accessToken = (0, tokenGenerate_1.createToken)(JwtToken, config_1.default.JWT_SECRET, config_1.default.JWT_EXPIRES_IN);
    return { accessToken };
};
const resetPassword = async (payload, email) => {
    if (!payload.newPassword)
        throw new AppError_1.default('Password is required', http_status_codes_1.StatusCodes.BAD_REQUEST);
    const isExistingUser = await user_model_1.User.isUserExistByEmail(email);
    if (!isExistingUser)
        throw new AppError_1.default('No account found with the provided credentials.', http_status_codes_1.StatusCodes.NOT_FOUND);
    const hashedPassword = await bcrypt_1.default.hash(payload.newPassword, Number(config_1.default.bcryptSaltRounds));
    const result = await user_model_1.User.findOneAndUpdate({ email }, {
        password: hashedPassword,
        resetPasswordOtp: null,
        resetPasswordOtpExpires: null,
    }, { new: true }).select('-password -otp -otpExpires -resetPasswordOtp -resetPasswordOtpExpires');
    return result;
};
const changePassword = async (payload, email) => {
    const { currentPassword, newPassword } = payload;
    if (!currentPassword || !newPassword) {
        throw new AppError_1.default('Current and new passwords are required', http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    const isExistingUser = await user_model_1.User.isUserExistByEmail(email);
    if (!isExistingUser)
        throw new AppError_1.default('No account found with the provided credentials.', http_status_codes_1.StatusCodes.NOT_FOUND);
    const isPasswordMatched = await user_model_1.User.isPasswordMatch(currentPassword, isExistingUser.password);
    if (!isPasswordMatched)
        throw new AppError_1.default('Current password is incorrect', http_status_codes_1.StatusCodes.BAD_REQUEST);
    const hashedPassword = await bcrypt_1.default.hash(newPassword, Number(config_1.default.bcryptSaltRounds));
    const result = await user_model_1.User.findOneAndUpdate({ email }, {
        password: hashedPassword,
    }, { new: true }).select('-password -otp -otpExpires -resetPasswordOtp -resetPasswordOtpExpires');
    return result;
};
const authService = {
    register,
    login,
    refreshToken,
    forgotPassword,
    resendForgotOtpCode,
    verifyOtp,
    resetPassword,
    changePassword,
};
exports.default = authService;
