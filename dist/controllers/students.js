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
exports.login = exports.softDeleteStudent = exports.hardDeleteStudent = exports.updateStudent = exports.getStudent = exports.getStudents = exports.verifyStudent = exports.createStudent = void 0;
const student_1 = __importDefault(require("../models/student"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const mail_1 = require("../mail/mail");
const randomstring_1 = __importDefault(require("randomstring"));
const generarJWT_1 = require("../helpers/generarJWT");
const createStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dni, nombre, email, contraseña, } = req.body;
    const student = new student_1.default({ dni, nombre, email, contraseña });
    // Encriptar contraseña
    const salt = bcryptjs_1.default.genSaltSync();
    student.contraseña = bcryptjs_1.default.hashSync(contraseña, salt);
    // Generar código de verificación
    student.code = randomstring_1.default.generate(6);
    // Guardar en BD
    yield student.save();
    // Enviar email
    (0, mail_1.sendEmail)(email, student.code);
    res.json({
        message: "Student created successfully",
        student
    });
});
exports.createStudent = createStudent;
const verifyStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, code } = req.body;
    try {
        const usuario = yield student_1.default.findOne({ email });
        if (!usuario) {
            return res.json({
                message: "Email not found"
            });
        }
        if (usuario.verified) {
            return res.json({
                message: "Email already verified"
            });
        }
        if (usuario.code !== code) {
            return res.json({
                message: "Invalid code"
            });
        }
        yield student_1.default.findByIdAndUpdate(usuario.email, { verified: true });
        res.json({
            message: "Email verified successfully",
            usuario
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            message: "Something went wrong"
        });
    }
});
exports.verifyStudent = verifyStudent;
const getStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const condicion = { estado: true };
    const students = yield student_1.default.find(condicion);
    if (!students) {
        return res.json({
            message: "Students not found"
        });
    }
    res.json({
        message: "Students obtained successfully",
        students
    });
});
exports.getStudents = getStudents;
const getStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dni } = req.params;
    const student = yield student_1.default.findOne({ dni });
    if (!student) {
        return res.json({
            message: "Student not found"
        });
    }
    res.json({
        message: "Student obtained successfully",
        student
    });
});
exports.getStudent = getStudent;
const updateStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dni } = req.params;
    const _a = req.body, { estado } = _a, data = __rest(_a, ["estado"]);
    const student = yield student_1.default.findOneAndUpdate({ dni }, data, { new: true });
    if (!student) {
        return res.json({
            message: "Student not found"
        });
    }
    res.json({
        message: "Student updated successfully",
        student
    });
});
exports.updateStudent = updateStudent;
const hardDeleteStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dni } = req.params;
    const student = yield student_1.default.findOneAndDelete({ dni });
    if (!student) {
        return res.json({
            message: "Student not found"
        });
    }
    res.json({
        message: "Student deleted successfully",
        student
    });
});
exports.hardDeleteStudent = hardDeleteStudent;
const softDeleteStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dni } = req.params;
    const student = yield student_1.default.findOneAndUpdate({ dni }, { estado: false }, { new: true });
    if (!student) {
        return res.json({
            message: "Student not found"
        });
    }
    res.json({
        message: "Student deleted successfully",
        student
    });
});
exports.softDeleteStudent = softDeleteStudent;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, contraseña } = req.body;
    try {
        const usuario = yield student_1.default.findOne({ email });
        if (!usuario) {
            return res.json({
                message: "Email not found"
            });
        }
        const validPassword = bcryptjs_1.default.compareSync(contraseña, usuario.contraseña);
        if (!validPassword) {
            return res.json({
                message: "Invalid password"
            });
        }
        const token = yield (0, generarJWT_1.generarJWT)(usuario.id);
        res.json({
            message: "Login successfully",
            usuario,
            token
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            message: "Something went wrong"
        });
    }
});
exports.login = login;
