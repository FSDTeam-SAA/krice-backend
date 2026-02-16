"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePastProject = exports.updatePastProject = exports.getPastProjectById = exports.getAllPastProjects = exports.createPastProject = void 0;
const pastProject_model_1 = require("./pastProject.model");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const cloudinary_1 = require("../../utils/cloudinary");
// Create a new past project
exports.createPastProject = (0, catchAsync_1.default)(async (req, res) => {
    // Handle file uploads (multer should provide req.files)
    const files = req.files;
    let pastImage = req.body.pastImage;
    let remodelImage = req.body.remodelImage;
    let thumbnailImage = req.body.thumbnailImage;
    // Upload images to Cloudinary if files are present
    if (files) {
        if (files['pastImage']?.[0]) {
            const upload = await (0, cloudinary_1.uploadToCloudinary)(files['pastImage'][0].path);
            pastImage = upload?.secure_url;
        }
        if (files['remodelImage']?.[0]) {
            const upload = await (0, cloudinary_1.uploadToCloudinary)(files['remodelImage'][0].path);
            remodelImage = upload?.secure_url;
        }
        if (files['thumbnailImage']?.[0]) {
            const upload = await (0, cloudinary_1.uploadToCloudinary)(files['thumbnailImage'][0].path);
            thumbnailImage = upload?.secure_url;
        }
    }
    const project = await pastProject_model_1.PastProject.create({
        title: req.body.title,
        description: req.body.description,
        pastImage,
        remodelImage,
        thumbnailImage,
    });
    res.status(201).json({ success: true, data: project });
});
// Get all past projects
exports.getAllPastProjects = (0, catchAsync_1.default)(async (_req, res) => {
    const projects = await pastProject_model_1.PastProject.find();
    res.status(200).json({ success: true, data: projects });
});
// Get a single past project by ID
exports.getPastProjectById = (0, catchAsync_1.default)(async (req, res) => {
    const project = await pastProject_model_1.PastProject.findById(req.params.id);
    if (!project) {
        return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.status(200).json({ success: true, data: project });
});
// Update a past project by ID
exports.updatePastProject = (0, catchAsync_1.default)(async (req, res) => {
    const files = req.files;
    let updateData = {
        ...req.body,
    };
    // Handle file uploads for update
    if (files) {
        if (files['pastImage']?.[0]) {
            const upload = await (0, cloudinary_1.uploadToCloudinary)(files['pastImage'][0].path);
            updateData.pastImage = upload?.secure_url;
        }
        if (files['remodelImage']?.[0]) {
            const upload = await (0, cloudinary_1.uploadToCloudinary)(files['remodelImage'][0].path);
            updateData.remodelImage = upload?.secure_url;
        }
        if (files['thumbnailImage']?.[0]) {
            const upload = await (0, cloudinary_1.uploadToCloudinary)(files['thumbnailImage'][0].path);
            updateData.thumbnailImage = upload?.secure_url;
        }
    }
    const project = await pastProject_model_1.PastProject.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!project) {
        return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.status(200).json({ success: true, data: project });
});
// Delete a past project by ID
exports.deletePastProject = (0, catchAsync_1.default)(async (req, res) => {
    const project = await pastProject_model_1.PastProject.findByIdAndDelete(req.params.id);
    if (!project) {
        return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.status(200).json({ success: true, message: 'Project deleted' });
});
