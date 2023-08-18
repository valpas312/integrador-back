"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CamadaSchema = new mongoose_1.Schema({
    nombre: { type: String, unique: true },
    diasDeCursada: { type: String },
    modulo: { type: String }
});
const Camada = (0, mongoose_1.model)("Camada", CamadaSchema);
exports.default = Camada;
