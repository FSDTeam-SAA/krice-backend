"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const member_controller_1 = require("./member.controller");
const multer_middleware_1 = require("../../middlewares/multer.middleware");
const router = (0, express_1.Router)();
// Public CRUD routes
router.post('/', multer_middleware_1.upload.fields([{ name: 'image', maxCount: 1 }]), member_controller_1.createMember);
router.get('/', member_controller_1.getAllMembers);
router.get('/:id', member_controller_1.getMemberById);
router.put('/:id', multer_middleware_1.upload.fields([{ name: 'image', maxCount: 1 }]), member_controller_1.updateMember);
router.delete('/:id', member_controller_1.deleteMember);
exports.default = router;
