import { Router } from "express";
import { getTurnos, createTurno } from "../controllers/turnos";
import validarJWT from "../middlewares/validarJWT";
import { recolectarErrores } from "../middlewares/recolectarErrores";
import { isVerified } from "../middlewares/validarVerificado";
import { ExpressValidator, check } from "express-validator";

const router = Router();

router.get("/", [validarJWT, recolectarErrores] , getTurnos);

router.post("/", [validarJWT, isVerified,
    check("fecha", "La fecha es obligatoria").not().isEmpty(),
    check("hora", "La hora es obligatoria").not().isEmpty(),
    check("especialidad", "La especialidad es obligatoria").not().isEmpty(),
    check("medico", "El médico es obligatorio").not().isEmpty(),
    recolectarErrores
], createTurno)

export default router;