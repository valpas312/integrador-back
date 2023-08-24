import { Router } from "express";
import { getTurnos, verifyTurno, createTurno, softDeleteTurno, hardDeleteTurno } from "../controllers/turnos";
import validarJWT from "../middlewares/validarJWT";
import { recolectarErrores } from "../middlewares/recolectarErrores";
import { isVerified } from "../middlewares/validarVerificado";
import { check } from "express-validator";

const router = Router();

router.get("/", [validarJWT, recolectarErrores], getTurnos);

router.post("/", [validarJWT, isVerified,
    check("especialidad", "La especialidad es obligatoria").not().isEmpty(),
    check("medico", "El médico es obligatorio").not().isEmpty(),
    recolectarErrores
], createTurno)

router.put("/:_id", [validarJWT, recolectarErrores], verifyTurno);

router.delete("/soft/:_id", [validarJWT, recolectarErrores], softDeleteTurno);

router.delete("/hard/:_id", [validarJWT, recolectarErrores], hardDeleteTurno);

export default router;