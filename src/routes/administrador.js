import httpAdmin from "../../controllers/administrador.js"
import { Router } from "express"
import {check} from "express-validator"
import {validarResultados} from "../../midelwares/validaciones.js"

const router = Router()
  
  router.get("/", httpAdmin.getAdmins)
  
  router.get("/:cedula", httpAdmin.getAdminCedula)
  
  router.post("/", [
    check("nombre", "el mombre es obligatorio").notEmpty().trim().isString(),
    check("cedula", "la cedula es obligatoria y de minimo 8 caracteres").notEmpty().isString().trim().isLength({min: 8}),
    check("email", "El email es obligatorio").notEmpty().isString().trim(),
    check("password", "El password es obligatorio").notEmpty().isString().trim(),
    check("direccion", "La direccion es obligatoria").notEmpty().isString().trim(),
    check("apellido", "El apellido es obligatorio").notEmpty().isString().trim(),
    check("telefono", "El telefono es obligatorio").notEmpty().isString().trim(),
    validarResultados
  ], httpAdmin.postAdmin)
  
  router.put("/:cedula", httpAdmin.putAdmin)
  
  router.put("/estado/:cedula",httpAdmin.putAdminEstado)
  
  
  export default router