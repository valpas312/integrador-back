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
exports.getCamadas = exports.createCamada = void 0;
const camada_1 = __importDefault(require("../models/camada"));
const createCamada = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const camadaData = req.body;
    const { nombre, diasDeCursada, modulo } = camadaData;
    if (!nombre || !diasDeCursada || !modulo) {
        return res.json({
            message: "Camada not created"
        });
    }
    const camada = yield camada_1.default.findOne({ nombre });
    if (camada) {
        return res.json({
            message: "Camada already exists"
        });
    }
    const newCamada = new camada_1.default(camadaData);
    yield newCamada.save();
    res.json({
        message: "Camada created successfully",
        newCamada
    });
});
exports.createCamada = createCamada;
const getCamadas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const camadas = yield camada_1.default.find();
    if (!camadas) {
        return res.json({
            message: "Camadas not found"
        });
    }
    res.json({
        message: "Camadas found",
        camadas
    });
});
exports.getCamadas = getCamadas;
