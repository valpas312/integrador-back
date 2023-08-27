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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.softDeleteUser = exports.hardDeleteUser = exports.updateUser = exports.getUser = exports.getUsers = exports.verifyUser = exports.createUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const mail_1 = require("../mail/mail");
const randomstring_1 = __importDefault(require("randomstring"));
const generarJWT_1 = require("../helpers/generarJWT");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dni, nombre, email, contraseña, } = req.body;
    const user = new user_1.default({ dni, nombre, email, contraseña });
    const salt = bcryptjs_1.default.genSaltSync();
    user.contraseña = bcryptjs_1.default.hashSync(contraseña, salt);
    user.code = randomstring_1.default.generate(6);
    yield user.save();
    (0, mail_1.sendEmail)(email, user.code);
    res.json({
        message: "Usuario creado correctamente",
        user
    });
});
exports.createUser = createUser;
const verifyUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, code } = req.body;
    try {
        const usuario = yield user_1.default.findOne({ email });
        if (!usuario) {
            return res.json({
                message: "Email no encontrado"
            });
        }
        if (usuario.verified) {
            return res.json({
                message: "Email ya verificado"
            });
        }
        if (usuario.code !== code) {
            return res.json({
                message: "Codigo incorrecto"
            });
        }
        yield user_1.default.findOneAndUpdate({ email }, { verified: true });
        res.json({
            message: "Email verificado correctamente",
            usuario
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            message: "Algo salio mal",
            error
        });
    }
});
exports.verifyUser = verifyUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const condicion = { estado: true };
    const usuarios = yield user_1.default.find(condicion);
    if (!usuarios) {
        return res.json({
            message: "Usuarios no encontrados"
        });
    }
    res.json({
        message: "Usuarios obtenidos correctamente",
        usuarios
    });
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dni } = req.params;
    const usuario = yield user_1.default.findOne({ dni });
    if (!usuario) {
        return res.json({
            message: "Usuario no encontrado"
        });
    }
    res.json({
        message: "Usuario obtenido correctamente",
        usuario
    });
});
exports.getUser = getUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dni } = req.params;
    const _a = req.body, { estado } = _a, data = __rest(_a, ["estado"]);
    const usuario = yield user_1.default.findOneAndUpdate({ dni }, data, { new: true });
    if (!usuario) {
        return res.json({
            message: "Usuario no encontrado"
        });
    }
    res.json({
        message: "Usuario actualizado correctamente",
        usuario
    });
});
exports.updateUser = updateUser;
const hardDeleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dni } = req.params;
    const usuario = yield user_1.default.findOneAndDelete({ dni });
    if (!usuario) {
        return res.json({
            message: "Usuario no encontrado"
        });
    }
    res.json({
        message: "Usuario eliminado correctamente",
        usuario
    });
});
exports.hardDeleteUser = hardDeleteUser;
const softDeleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dni } = req.params;
    const usuario = yield user_1.default.findOneAndUpdate({ dni }, { estado: false }, { new: true });
    if (!usuario) {
        return res.json({
            message: "Usuario no encontrado"
        });
    }
    res.json({
        message: "Usuario eliminado correctamente",
        usuario
    });
});
exports.softDeleteUser = softDeleteUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, contraseña } = req.body;
    try {
        const usuario = yield user_1.default.findOne({ email });
        if (!usuario) {
            return res.json({
                message: "Email no encontrado"
            });
        }
        const validPassword = bcryptjs_1.default.compareSync(contraseña, usuario.contraseña);
        if (!validPassword) {
            return res.json({
                message: "Contraseña incorrecta"
            });
        }
        const token = yield (0, generarJWT_1.generarJWT)(usuario.id);
        res.json({
            message: "Login correcto",
            usuario,
            token
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            message: "Algo salio mal"
        });
    }
});
exports.login = login;
