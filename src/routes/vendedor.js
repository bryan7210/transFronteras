import httpVendedor from "../../controllers/vendedor.js";
import { Router } from "express"
import { check } from "express-validator";
import validarResultados from "../../midelwares/validaciones.js";

const router = Router ()

router.get ("/", httpVendedor.getVendedor)

router.get ("/:cedula", httpVendedor.getVendedorCedula)

router.post ("/", [
    check("nombre", "el mombre es obligatorio").notEmpty().trim().isString(),
    check("cedula", "la cedula es obligatoria").notEmpty().isString().trim().isLength({max:8}),
    check("email", "El email es obligatorio").notEmpty().isString().trim(),
    check("password", "El password es obligatorio").notEmpty().isString().trim(),
    check("direccion", "La direccion es obligatoria").notEmpty().isString().trim(),
    check("apellido", "El apellido es obligatorio").notEmpty().isString().trim(),
    check("telefono", "El telefono es obligatorio").notEmpty().isString().trim(),
    validarResultados
], httpVendedor.postVendedor)

router.put ("/:cedula", httpVendedor.putVendedor)

router.put ("/:cedula", httpVendedor.putVendedorEstado)

export default router