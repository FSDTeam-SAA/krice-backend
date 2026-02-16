"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../../config/config"));
const userSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    homeAddress: {
        type: String,
    },
    city: {
        type: String,
    },
    region: {
        type: String,
    },
    selectedRole: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Role',
        default: null,
    },
    role: {
        type: String,
        enum: ['owner', 'employer'],
        default: 'employer',
    },
    image: {
        url: { type: String },
        publicId: { type: String },
    },
    balance: {
        type: Number,
        default: 0,
    },
    companyName: {
        type: String,
    },
    location: {
        type: String,
    },
    resetPasswordOtp: {
        type: String,
        default: null,
    },
    resetPasswordOtpExpires: {
        type: Date,
        default: null,
    },
    role_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Role',
        default: null,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    otp: {
        type: String,
        default: null,
    },
    otpExpires: {
        type: Date,
        default: null,
    },
    avatar: {
        type: String,
    },
}, {
    timestamps: true,
    versionKey: false,
});
userSchema.pre('save', async function (next) {
    this.password = await bcrypt_1.default.hash(this.password, Number(config_1.default.bcryptSaltRounds));
    next();
});
userSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
});
userSchema.statics.isPasswordMatch = async function (password, hashedPassword) {
    return await bcrypt_1.default.compare(password, hashedPassword);
};
userSchema.statics.isUserExistByEmail = async function (email) {
    return await exports.User.findOne({ email });
};
userSchema.statics.isUserExistById = async function (_id) {
    return await exports.User.findOne({ _id });
};
// applyEncryption(userSchema, [
//   'phoneNumber',
//   'homeAddress',
//   'city',
//   'region',
//   'location',
// ])
exports.User = (0, mongoose_1.model)('User', userSchema);
