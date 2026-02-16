"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PastProject = void 0;
const mongoose_1 = require("mongoose");
const pastProjectSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true }, // Accepts HTML
    pastImage: { type: String, required: true },
    remodelImage: { type: String, required: true },
    thumbnailImage: { type: String, required: true },
}, {
    timestamps: true,
});
exports.PastProject = (0, mongoose_1.model)('PastProject', pastProjectSchema);
