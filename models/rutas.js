import mongoose from "mongoose"

const rutasSchema = new mongoose.Schema({
    nombreRuta: { type: String, require: true },
    origen: { type: String, require: true },
    destino: { type: String, require: true },
    horarios: { type: String, require: true },
    tarifas: { type: String, require: true },
    infoContacto: { type: String, require: true, default: "transportesco@gmail.com" },
    estado: {type: Boolean, default: true}
    
})
 
export default mongoose.model("Ruta", rutasSchema)