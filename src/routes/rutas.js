import httpRutas from "../../controllers/rutas.js"
import { Router } from "express"
import { check } from "express-validator"
import { validarResultados } from "../../midelwares/validaciones.js"

const router = Router()

router.get("/", httpRutas.getRutas)

router.get("/:rutas", httpRutas.getRutaId)

router.post("/", [
    check("nombreRuta", "El mombre de la ruta es obligatorio").notEmpty().trim().isString(),
    check("origen", "El origen es obligatorio").notEmpty().isString().trim(),
    check("destino", "El destino es obligatorio").notEmpty().isString().trim(),
    check("horarios", "Los horarios son obligatoria").notEmpty().isString().trim(),
    check("tarifas", "La tarifa es obligatoria").notEmpty().isString().trim(),
    validarResultados
], httpRutas.postRuta) 

router.put("/:id", httpRutas.putRuta)

router.put("/:id", httpRutas.putRutaEstado)


export default router