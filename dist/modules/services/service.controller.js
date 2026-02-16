"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteService = exports.updateService = exports.getServiceById = exports.getAllServices = exports.createService = void 0;
const service_model_1 = require("./service.model");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const cloudinary_1 = require("../../utils/cloudinary");
// Create a new service
exports.createService = (0, catchAsync_1.default)(async (req, res) => {
    let image = req.body.image;
    const files = req.files;
    if (files?.['image']?.[0]) {
        const upload = await (0, cloudinary_1.uploadToCloudinary)(files['image'][0].path);
        image = upload?.secure_url;
    }
    const service = await service_model_1.Service.create({
        title: req.body.title,
        description: req.body.description,
        image,
    });
    res.status(201).json({ success: true, data: service });
});
// Get all services
exports.getAllServices = (0, catchAsync_1.default)(async (_req, res) => {
    const services = await service_model_1.Service.find();
    res.status(200).json({ success: true, data: services });
});
// Get a single service by ID
exports.getServiceById = (0, catchAsync_1.default)(async (req, res) => {
    const service = await service_model_1.Service.findById(req.params.id);
    if (!service) {
        return res.status(404).json({ success: false, message: 'Service not found' });
    }
    res.status(200).json({ success: true, data: service });
});
// Update a service by ID
exports.updateService = (0, catchAsync_1.default)(async (req, res) => {
    const files = req.files;
    let updateData = { ...req.body };
    if (files?.['image']?.[0]) {
        const upload = await (0, cloudinary_1.uploadToCloudinary)(files['image'][0].path);
        updateData.image = upload?.secure_url;
    }
    const service = await service_model_1.Service.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!service) {
        return res.status(404).json({ success: false, message: 'Service not found' });
    }
    res.status(200).json({ success: true, data: service });
});
// Delete a service by ID
exports.deleteService = (0, catchAsync_1.default)(async (req, res) => {
    const service = await service_model_1.Service.findByIdAndDelete(req.params.id);
    if (!service) {
        return res.status(404).json({ success: false, message: 'Service not found' });
    }
    res.status(200).json({ success: true, message: 'Service deleted' });
});
