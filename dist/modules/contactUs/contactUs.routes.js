"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contactUs_controller_1 = require("./contactUs.controller");
const router = (0, express_1.Router)();
// Public CRUD routes
router.post('/', contactUs_controller_1.createContactUs);
router.get('/', contactUs_controller_1.getAllContactUs);
router.get('/:id', contactUs_controller_1.getContactUsById);
router.put('/:id', contactUs_controller_1.updateContactUs);
router.delete('/:id', contactUs_controller_1.deleteContactUs);
exports.default = router;
