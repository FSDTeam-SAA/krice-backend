"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const service_controller_1 = require("./service.controller");
const multer_middleware_1 = require("../../middlewares/multer.middleware");
const router = (0, express_1.Router)();
// Public CRUD routes
router.post('/', multer_middleware_1.upload.fields([{ name: 'image', maxCount: 1 }]), service_controller_1.createService);
router.get('/', service_controller_1.getAllServices);
router.get('/:id', service_controller_1.getServiceById);
router.put('/:id', multer_middleware_1.upload.fields([{ name: 'image', maxCount: 1 }]), service_controller_1.updateService);
router.delete('/:id', service_controller_1.deleteService);
exports.default = router;
