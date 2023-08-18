"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const camadas_1 = require("../controllers/camadas");
const router = (0, express_1.Router)();
router.post('/', camadas_1.createCamada);
router.get('/', camadas_1.getCamadas);
exports.default = router;
