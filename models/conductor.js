import mongoose from "mongoose"

const conductorSchema = new mongoose.Schema({
    nombre : {type: String, required: true},
    cedula : {type: String, required: true, unique: true},
    direccion : {type: String, required:true},
    telefono : {type: String, required: true, unique: true},
    tipo_lisencia : {type: String, required: true}, // en caso de que sea: A1, C1, B2, ETC.
    vigencia : {type: String, required: true}, 
    targeta_propiedad : {type: String, required: true},
    estado : {type: Boolean, default: true} // 0 es inactivo y 1 es activo
})

export default mongoose.model("Conductor", conductorSchema)