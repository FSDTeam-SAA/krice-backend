"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pastProject_controller_1 = require("./pastProject.controller");
const multer_middleware_1 = require("../../middlewares/multer.middleware");
const router = (0, express_1.Router)();
// Public CRUD routes
router.post('/', multer_middleware_1.upload.fields([
    { name: 'pastImage', maxCount: 1 },
    { name: 'remodelImage', maxCount: 1 },
    { name: 'thumbnailImage', maxCount: 1 },
]), pastProject_controller_1.createPastProject);
router.get('/', pastProject_controller_1.getAllPastProjects);
router.get('/:id', pastProject_controller_1.getPastProjectById);
router.put('/:id', multer_middleware_1.upload.fields([
    { name: 'pastImage', maxCount: 1 },
    { name: 'remodelImage', maxCount: 1 },
    { name: 'thumbnailImage', maxCount: 1 },
]), pastProject_controller_1.updatePastProject);
router.delete('/:id', pastProject_controller_1.deletePastProject);
exports.default = router;
