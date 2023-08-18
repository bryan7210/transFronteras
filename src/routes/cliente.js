import httpCliente from "../../controllers/cliente.js"
import { Router } from "express"
import {check} from "express-validator"
import { validarResultados } from "../../midelwares/validaciones.js"

const router= Router()
  
  router.get("/", httpCliente.getClientes)
  
  router.get("/:cedula", httpCliente.getClienteCedula)
  
  router.post("/", [
    check("nombre", "el mombre es obligatorio").notEmpty().trim().isString(),
    check("cedula", "la cedula es obligatoria y de minimo 8 caracteres").notEmpty().isString().trim().isLength({min: 8}),
    check("telefono", "El telefono es obligatorio").notEmpty().isString().trim(),
    validarResultados
  ], httpCliente.postCliente)
  
  router.put("/:cedula", httpCliente.putCliente)
  
  router.put("/:estado/:cedula",httpCliente.putClienteEstado)
  
  export default router 