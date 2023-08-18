"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const students_1 = require("../controllers/students");
const express_validator_1 = require("express-validator");
const recolectarErrores_1 = require("../middlewares/recolectarErrores");
const validacionesDB_1 = require("../helpers/validacionesDB");
const router = (0, express_1.Router)();
router.post('/', students_1.createStudent, [
    (0, express_validator_1.check)("nombre", "El nombre es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("apellido", "El apellido es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("dni", "El dni es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("email", "El email es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("email", "El email no es válido").isEmail(),
    (0, express_validator_1.check)("email").custom(validacionesDB_1.existeEmail),
    (0, express_validator_1.check)("contraseña", "La contraseña es obligatoria").not().isEmpty(),
    (0, express_validator_1.check)("contraseña", "La contraseña debe tener al menos 6 caracteres").isLength({ min: 6 }),
    (0, express_validator_1.check)("contraseña", "La contraseña no debe tener mas de 10 caracteres").isLength({ max: 10 }),
    recolectarErrores_1.recolectarErrores
]);
router.post('/verify', students_1.verifyStudent, [
    (0, express_validator_1.check)("email", "El email es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("email", "El email no es válido").isEmail(),
    (0, express_validator_1.check)("code", "El código es obligatorio").not().isEmpty(),
    recolectarErrores_1.recolectarErrores
]);
router.post('/login', students_1.login, [
    (0, express_validator_1.check)("email", "El email es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("email", "El email no es válido").isEmail(),
    (0, express_validator_1.check)("contraseña", "La contraseña es obligatoria").not().isEmpty(),
    (0, express_validator_1.check)("contraseña", "La contraseña debe tener al menos 6 caracteres").isLength({ min: 6 }),
    (0, express_validator_1.check)("contraseña", "La contraseña no debe tener mas de 10 caracteres").isLength({ max: 10 }),
    recolectarErrores_1.recolectarErrores
]);
router.get('/', students_1.getStudents);
router.get('/:dni', students_1.getStudent);
router.put('/:dni', students_1.updateStudent);
router.delete('/:dni', students_1.hardDeleteStudent);
router.delete('/soft/:dni', students_1.softDeleteStudent);
exports.default = router;
