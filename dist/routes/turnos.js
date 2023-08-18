"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const turnos_1 = require("../controllers/turnos");
const validarJWT_1 = __importDefault(require("../middlewares/validarJWT"));
const recolectarErrores_1 = require("../middlewares/recolectarErrores");
const validarVerificado_1 = require("../middlewares/validarVerificado");
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
router.get("/", [validarJWT_1.default, recolectarErrores_1.recolectarErrores], turnos_1.getTurnos);
router.post("/", [validarJWT_1.default, validarVerificado_1.isVerified,
    (0, express_validator_1.check)("fecha", "La fecha es obligatoria").not().isEmpty(),
    (0, express_validator_1.check)("hora", "La hora es obligatoria").not().isEmpty(),
    (0, express_validator_1.check)("especialidad", "La especialidad es obligatoria").not().isEmpty(),
    (0, express_validator_1.check)("medico", "El médico es obligatorio").not().isEmpty(),
    recolectarErrores_1.recolectarErrores
], turnos_1.createTurno);
exports.default = router;
