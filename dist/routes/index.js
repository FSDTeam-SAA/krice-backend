"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const contactUs_routes_1 = __importDefault(require("../modules/contactUs/contactUs.routes"));
const express_1 = require("express");
const user_routes_1 = __importDefault(require("../modules/user/user.routes"));
const auth_router_1 = __importDefault(require("../modules/auth/auth.router"));
const pastProject_routes_1 = __importDefault(require("../modules/pastProject/pastProject.routes"));
const service_routes_1 = __importDefault(require("../modules/services/service.routes"));
const member_routes_1 = __importDefault(require("../modules/members/member.routes"));
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/users',
        route: user_routes_1.default,
    },
    {
        path: '/auth',
        route: auth_router_1.default,
    },
    {
        path: '/past-projects',
        route: pastProject_routes_1.default,
    },
    {
        path: '/services',
        route: service_routes_1.default,
    },
    {
        path: '/members',
        route: member_routes_1.default,
    },
    {
        path: '/contact-us',
        route: contactUs_routes_1.default,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
