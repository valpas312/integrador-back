"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTurno = exports.getTurnos = void 0;
const turno_1 = __importDefault(require("../models/turno"));
const getTurnos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarioId = req.body.usuuarioConfirmado._id;
    const turnos = yield turno_1.default.find({ paciente: usuarioId }).populate('paciente', 'nombre apellido').exec();
    res.json({
        data: [...turnos]
    });
});
exports.getTurnos = getTurnos;
const createTurno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarioId = req.body.usuuarioConfirmado._id;
    const turnoData = req.body;
    const data = new turno_1.default(Object.assign(Object.assign({}, turnoData), { paciente: usuarioId, fecha: new Date(), estado: 'Pendiente a confirmar' }));
    const turno = new turno_1.default(data);
    yield turno.save();
    res.json({
        msg: 'Turno creado',
        data: turno
    });
});
exports.createTurno = createTurno;
