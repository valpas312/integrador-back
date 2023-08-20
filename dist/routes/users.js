"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../controllers/users");
const express_validator_1 = require("express-validator");
const recolectarErrores_1 = require("../middlewares/recolectarErrores");
const validacionesDB_1 = require("../helpers/validacionesDB");
const router = (0, express_1.Router)();
router.post('/', [
    (0, express_validator_1.check)("nombre", "El nombre es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("dni", "El dni es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("email", "El email es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("email", "El email no es válido").isEmail(),
    (0, express_validator_1.check)("email").custom(validacionesDB_1.existeEmail),
    (0, express_validator_1.check)("contraseña", "La contraseña es obligatoria").not().isEmpty(),
    (0, express_validator_1.check)("contraseña", "La contraseña debe tener al menos 6 caracteres").isLength({ min: 6 }),
    (0, express_validator_1.check)("contraseña", "La contraseña no debe tener mas de 10 caracteres").isLength({ max: 10 }),
    recolectarErrores_1.recolectarErrores
], users_1.createUser);
router.post('/verify', [
    (0, express_validator_1.check)("email", "El email es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("email", "El email no es válido").isEmail(),
    (0, express_validator_1.check)("code", "El código es obligatorio").not().isEmpty(),
    recolectarErrores_1.recolectarErrores
], users_1.verifyUser);
router.post('/login', [
    (0, express_validator_1.check)("email", "El email es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("email", "El email no es válido").isEmail(),
    (0, express_validator_1.check)("contraseña", "La contraseña es obligatoria").not().isEmpty(),
    (0, express_validator_1.check)("contraseña", "La contraseña debe tener al menos 6 caracteres").isLength({ min: 6 }),
    (0, express_validator_1.check)("contraseña", "La contraseña no debe tener mas de 10 caracteres").isLength({ max: 10 }),
    recolectarErrores_1.recolectarErrores
], users_1.login);
router.get('/', users_1.getUsers);
router.get('/:dni', users_1.getUser);
router.put('/:dni', [
    (0, express_validator_1.check)("nombre", "El nombre es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("dni", "El dni es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("email", "El email es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("email", "El email no es válido").isEmail(),
    (0, express_validator_1.check)("contraseña", "La contraseña es obligatoria").not().isEmpty(),
    (0, express_validator_1.check)("contraseña", "La contraseña debe tener al menos 6 caracteres").isLength({ min: 6 }),
    (0, express_validator_1.check)("contraseña", "La contraseña no debe tener mas de 10 caracteres").isLength({ max: 10 }),
    recolectarErrores_1.recolectarErrores
], users_1.updateUser);
router.delete('/:dni', users_1.hardDeleteUser);
router.delete('/soft/:dni', users_1.softDeleteUser);
exports.default = router;
