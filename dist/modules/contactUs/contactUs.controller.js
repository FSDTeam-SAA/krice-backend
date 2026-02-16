"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContactUs = exports.updateContactUs = exports.getContactUsById = exports.getAllContactUs = exports.createContactUs = void 0;
const contactUs_model_1 = require("./contactUs.model");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
// Create a new contact us entry
exports.createContactUs = (0, catchAsync_1.default)(async (req, res) => {
    const contact = await contactUs_model_1.ContactUs.create({
        fullName: req.body.fullName,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        address: req.body.address,
        message: req.body.message,
    });
    res.status(201).json({ success: true, data: contact });
});
// Get all contact us entries
exports.getAllContactUs = (0, catchAsync_1.default)(async (_req, res) => {
    const contacts = await contactUs_model_1.ContactUs.find();
    res.status(200).json({ success: true, data: contacts });
});
// Get a single contact us entry by ID
exports.getContactUsById = (0, catchAsync_1.default)(async (req, res) => {
    const contact = await contactUs_model_1.ContactUs.findById(req.params.id);
    if (!contact) {
        return res.status(404).json({ success: false, message: 'Contact not found' });
    }
    res.status(200).json({ success: true, data: contact });
});
// Update a contact us entry by ID
exports.updateContactUs = (0, catchAsync_1.default)(async (req, res) => {
    const contact = await contactUs_model_1.ContactUs.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!contact) {
        return res.status(404).json({ success: false, message: 'Contact not found' });
    }
    res.status(200).json({ success: true, data: contact });
});
// Delete a contact us entry by ID
exports.deleteContactUs = (0, catchAsync_1.default)(async (req, res) => {
    const contact = await contactUs_model_1.ContactUs.findByIdAndDelete(req.params.id);
    if (!contact) {
        return res.status(404).json({ success: false, message: 'Contact not found' });
    }
    res.status(200).json({ success: true, message: 'Contact deleted' });
});
