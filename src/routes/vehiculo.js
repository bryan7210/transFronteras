import httpVehiculo from "../../controllers/vehiculo.js"
import { Router } from "express"
import { check } from "express-validator"
import { validarResultados } from "../../midelwares/validaciones.js"

const router = Router()

router.get("/", httpVehiculo.getVehiculos)
 
router.get("/:matricula", httpVehiculo.getVehiculoId)

router.post("/", [
    check("num_vehiculo", "El numero del vehiculo es obligatorio").notEmpty().trim().isString(),
    check("matricula", "la matricula es obligatoria").notEmpty().isString().trim(),
    check("propietario", "El propietario es obligatorio").notEmpty().isString().trim(),
    check("soat", "El soat es obligatorio").notEmpty().isString().trim(),
    check("tecnomecanica", "La tecnomecanica es obligatoria").notEmpty().isString().trim(),
    check("capacidad", "La capacidad es obligatoria").notEmpty().isString().trim(),
    validarResultados
], httpVehiculo.postVehiculo)
 
router.put("/:matricula", httpVehiculo.putVehiculo)

router.put("/:matricula", httpVehiculo.putVehiculoEstado)

export default router