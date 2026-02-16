"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactUs = void 0;
const mongoose_1 = require("mongoose");
const contactUsSchema = new mongoose_1.Schema({
    fullName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    message: { type: String, required: true },
}, {
    timestamps: true,
});
exports.ContactUs = (0, mongoose_1.model)('ContactUs', contactUsSchema);
