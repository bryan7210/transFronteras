import httpTikeck from "../../controllers/tikeck.js"
import { Router } from "express"
import {check} from "express-validator"
import { validarResultados } from "../../midelwares/validaciones.js"

const router= Router()
  
  router.get("/", httpTikeck.getTikecks)
  
  router.get("/:cedula", httpTikeck.getTikeckId)

  router.get("/:id", httpTikeck.getBuscarTikeck)
  
  router.post("/",  [
    //check("numeroTikeck", "El numero de tikeck es obligatorio").notEmpty().trim().isString(),
    check("asiento", "El asiento es obligatorio").notEmpty().isString().trim(),
    check("valorTicket", "El valor es obligatorio").notEmpty().isString().trim(),
    check("busAsignado", "El bus es obligatoria").notEmpty().isString().trim(),
    check("cliente", "El cliente es obligatorio").notEmpty().isString().trim(),
    validarResultados
  ], httpTikeck.postTikeck)
  
  router.put("/:cedula", httpTikeck.putTikeck)
  
  router.put("/:id",httpTikeck.putTikeckEstado)
  
  export default router