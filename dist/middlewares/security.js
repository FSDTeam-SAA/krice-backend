"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applySecurity = exports.loginLimiter = void 0;
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const helmet_1 = __importDefault(require("helmet"));
const hpp_1 = __importDefault(require("hpp"));
const globalLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 15000,
    standardHeaders: true,
    legacyHeaders: false,
    message: "Too many requests, try again later.",
    skip: (req) => req.method === "OPTIONS",
});
exports.loginLimiter = (0, express_rate_limit_1.default)({
    windowMs: 20 * 60 * 1000,
    max: 2000,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many login attempts, try again later.',
    skip: (req) => req.method === 'OPTIONS',
});
const corsOptions = {
    origin: [
        'http://localhost:3000',
        'http://localhost:3001',
        'https://pjswag-store.vercel.app',
        'https://pjswag-dashboard.vercel.app',
    ],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    credentials: true,
    optionsSuccessStatus: 204,
};
const applySecurity = (app) => {
    /* 1️⃣ Handle CORS first (IMPORTANT) */
    app.use((0, cors_1.default)(corsOptions));
    // app.options("/*", cors(corsOptions)); // Preflight handle
    // app.options("/api/:path(*)", cors(corsOptions)); // path param explicit
    /* 2️⃣ Helmet security headers */
    app.use((0, helmet_1.default)({
        contentSecurityPolicy: false, // frontend (Next/Vercel) এর জন্য safe
        crossOriginEmbedderPolicy: false,
    }));
    app.use(helmet_1.default.frameguard({ action: 'deny' }));
    app.use(helmet_1.default.noSniff());
    /* 3️⃣ Rate limiting */
    app.use(globalLimiter);
    /* 4️⃣ Prevent HTTP parameter pollution */
    app.use((0, hpp_1.default)({
        whitelist: ['products'], // duplicate allowed params
    }));
    /* 5️⃣ Compression */
    app.use((0, compression_1.default)());
    /* 6️⃣ Body parsers (payload protection) */
    app.use(express_1.default.json({ limit: '10kb' }));
    app.use(express_1.default.urlencoded({ extended: true, limit: '10kb' }));
};
exports.applySecurity = applySecurity;
