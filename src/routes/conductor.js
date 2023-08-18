import httpConductor from "../../controllers/conductor.js"
import { Router } from "express"
import { check} from "express-validator"
import { validarResultados } from "../../midelwares/validaciones.js"

const router = Router()

router.get ("/", httpConductor.getConductores)

router.get("/:cedula", httpConductor.getConductorCedula)

router.post("/", [
    check("nombre", "el mombre es obligatorio").notEmpty().trim().isString(),
   check("direccion", "La direccion es obligatoria").notEmpty().isString().trim(),
    check("cedula", "la cedula es obligatoria y de minimo 8 caracteres").notEmpty().isString().trim().isLength({min: 8}),
    check("tipo_lisencia", "El tipo de licencia es obligatorio").notEmpty().isString().trim(),
    check("telefono", "El telefono es obligatorio").notEmpty().isString().trim(),
    check("vigencia", "La vigencia es obligatoria").notEmpty().isString().trim(),
    check("targeta_propiedad", "La targeta de propiedad es obligatoria"),
    validarResultados
], httpConductor.postConductor)

router.put("/:cedula", httpConductor.putConductor)

router.put("/estado/:cedula", httpConductor.putConductorEstado)

export default router