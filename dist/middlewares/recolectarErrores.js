"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recolectarErrores = void 0;
const express_validator_1 = require("express-validator");
const recolectarErrores = (req, res, next) => {
    const err = (0, express_validator_1.validationResult)(req);
    if (!err.isEmpty()) {
        res.status(400).json({
            ok: false,
            err: err.mapped()
        });
    }
    next();
};
exports.recolectarErrores = recolectarErrores;
