import httpUsuario from "../../controllers/usuario.js"
import { Router } from "express"
import {check} from "express-validator"
import { validarResultados } from "../../midelwares/validaciones.js"

const router= Router()
  
  router.get("/", httpUsuario.getUsuarios)
  
  router.get("/:cedula", httpUsuario.getUsuarioCedula)
  
  router.post("/", [
    check("nombre", "el mombre es obligatorio").notEmpty().trim().isString(),
    check("apellido", "El apellido es obligatorio").notEmpty().trim().isString(),
    check("cedula", "la cedula es obligatoria y de minimo 8 caracteres").notEmpty().isNumeric().trim().isLength({min: 8}),
    check("email", "El email es obligatorio").notEmpty().isString().trim(),
    check("direccion", "La direccion es obligatoria").notEmpty().isString().trim(),
    check("apellido", "El apellido es obligatorio").notEmpty().isString().trim(),
    check("telefono", "El telefono es obligatorio").notEmpty().isString().trim(),
    validarResultados
  ] , httpUsuario.postUsuario)
  
  router.put("/:cedula", httpUsuario.putUsuario)
  
  router.put("/:cedula",httpUsuario.putUsuarioEstado)
  
  export default router