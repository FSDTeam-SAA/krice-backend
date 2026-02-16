"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMember = exports.updateMember = exports.getMemberById = exports.getAllMembers = exports.createMember = void 0;
const member_model_1 = require("./member.model");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const cloudinary_1 = require("../../utils/cloudinary");
// Create a new member
exports.createMember = (0, catchAsync_1.default)(async (req, res) => {
    let image = req.body.image;
    const files = req.files;
    if (files?.['image']?.[0]) {
        const upload = await (0, cloudinary_1.uploadToCloudinary)(files['image'][0].path);
        image = upload?.secure_url;
    }
    const member = await member_model_1.Member.create({
        name: req.body.name,
        role: req.body.role,
        description: req.body.description,
        image,
    });
    res.status(201).json({ success: true, data: member });
});
// Get all members
exports.getAllMembers = (0, catchAsync_1.default)(async (_req, res) => {
    const members = await member_model_1.Member.find();
    res.status(200).json({ success: true, data: members });
});
// Get a single member by ID
exports.getMemberById = (0, catchAsync_1.default)(async (req, res) => {
    const member = await member_model_1.Member.findById(req.params.id);
    if (!member) {
        return res.status(404).json({ success: false, message: 'Member not found' });
    }
    res.status(200).json({ success: true, data: member });
});
// Update a member by ID
exports.updateMember = (0, catchAsync_1.default)(async (req, res) => {
    const files = req.files;
    let updateData = { ...req.body };
    if (files?.['image']?.[0]) {
        const upload = await (0, cloudinary_1.uploadToCloudinary)(files['image'][0].path);
        updateData.image = upload?.secure_url;
    }
    const member = await member_model_1.Member.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!member) {
        return res.status(404).json({ success: false, message: 'Member not found' });
    }
    res.status(200).json({ success: true, data: member });
});
// Delete a member by ID
exports.deleteMember = (0, catchAsync_1.default)(async (req, res) => {
    const member = await member_model_1.Member.findByIdAndDelete(req.params.id);
    if (!member) {
        return res.status(404).json({ success: false, message: 'Member not found' });
    }
    res.status(200).json({ success: true, message: 'Member deleted' });
});
