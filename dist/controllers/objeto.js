"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
;
const objteto = {
    id: 1,
    nombre: "Juan",
    isAdmin: false
};
const clave = "1234";
const token = jsonwebtoken_1.default.sign(objteto, clave);
console.log(token);
const tokenConExpiracion = jsonwebtoken_1.default.sign(objteto, clave, { expiresIn: "30m" });
console.log(tokenConExpiracion);
