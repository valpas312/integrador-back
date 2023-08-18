"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const turnoSchema = new mongoose_1.Schema({
    fecha: { type: Date, required: true },
    hora: { type: String, required: true },
    paciente: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Users', required: true },
    medico: { type: String, required: true },
    especialidad: { type: String, required: true },
    estado: { type: String, required: true },
});
const Turno = (0, mongoose_1.model)('Turno', turnoSchema);
exports.default = Turno;
