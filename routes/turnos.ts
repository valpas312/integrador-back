import { Router } from "express";
import { getTurnos, verifyTurno, createTurno, softDeleteTurno, hardDeleteTurno, getTurnosAsistidos, getTurnosCancelados, getTurnosConfirmados, getTurnosPendientes } from "../controllers/turnos";
import validarJWT from "../middlewares/validarJWT";
import { recolectarErrores } from "../middlewares/recolectarErrores";
import { isVerified } from "../middlewares/validarVerificado";
import { check } from "express-validator";

const router = Router();

router.get("/", [validarJWT, recolectarErrores], getTurnos);

router.get("/pendientes", [validarJWT, recolectarErrores], getTurnosPendientes);

router.get("/confirmados", [validarJWT, recolectarErrores], getTurnosConfirmados);

router.get("/cancelados", [validarJWT, recolectarErrores], getTurnosCancelados);

router.get("/asistidos", [validarJWT, recolectarErrores], getTurnosAsistidos);

router.post("/", [validarJWT, isVerified,
    check("especialidad", "La especialidad es obligatoria").not().isEmpty(),
    check("medico", "El médico es obligatorio").not().isEmpty(),
    recolectarErrores
], createTurno)

router.put("/:_id", [validarJWT, recolectarErrores], verifyTurno);

router.delete("/soft/:_id", [validarJWT, recolectarErrores], softDeleteTurno);

router.delete("/hard/:_id", [validarJWT, recolectarErrores], hardDeleteTurno);

export default router;