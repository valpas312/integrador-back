import { Router } from "express"; 
import { createUser, login, verifyUser, getUsers, getUser, updateUser, hardDeleteUser, softDeleteUser } from "../controllers/users";
import { check } from "express-validator";
import { recolectarErrores } from "../middlewares/recolectarErrores";
import { existeEmail } from "../helpers/validacionesDB";

const router = Router();

router.post('/', createUser, [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("apellido", "El apellido es obligatorio").not().isEmpty(),
    check("dni", "El dni es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").not().isEmpty(),
    check("email", "El email no es válido").isEmail(),
    check("email").custom(existeEmail),
    check("contraseña", "La contraseña es obligatoria").not().isEmpty(),
    check("contraseña", "La contraseña debe tener al menos 6 caracteres").isLength({ min: 6 }),
    check("contraseña", "La contraseña no debe tener mas de 10 caracteres").isLength({ max: 10}),
    recolectarErrores
]);
router.post('/verify', verifyUser, [
    check("email", "El email es obligatorio").not().isEmpty(),
    check("email", "El email no es válido").isEmail(),
    check("code", "El código es obligatorio").not().isEmpty(),
    recolectarErrores
]);
router.post('/login', login, [
    check("email", "El email es obligatorio").not().isEmpty(),
    check("email", "El email no es válido").isEmail(),
    check("contraseña", "La contraseña es obligatoria").not().isEmpty(),
    check("contraseña", "La contraseña debe tener al menos 6 caracteres").isLength({ min: 6 }),
    check("contraseña", "La contraseña no debe tener mas de 10 caracteres").isLength({ max: 10}),
    recolectarErrores
]);
router.get('/', getUsers);
router.get('/:dni', getUser);
router.put('/:dni', updateUser);
router.delete('/:dni', hardDeleteUser);
router.delete('/soft/:dni', softDeleteUser);

export default router;  