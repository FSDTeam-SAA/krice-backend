"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../config/config"));
const sendEmail = async ({ to, subject, html }) => {
    try {
        const transporter = nodemailer_1.default.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: config_1.default.email.emailAddress,
                pass: config_1.default.email.emailPass,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });
        const mailOptions = {
            from: config_1.default.email.emailAddress,
            to,
            subject,
            html,
        };
        await transporter.sendMail(mailOptions);
        return { success: true };
    }
    catch (error) {
        return { success: false, error: error.message };
    }
};
exports.default = sendEmail;
