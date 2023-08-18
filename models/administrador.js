import mongoose from "mongoose"


const administradorSchema = new mongoose.Schema({
    cedula: { type: Number, required: true, unique: true},
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    password: { type: String, required: true},
    direccion: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    telefono: { type: String, required: true, unique: true },
    createdAt: {type: Date, default: Date.now}, // es para que se guarde la fecha
    estado: {type: Boolean, default: true} // 1 es activo y 0 es inactivo
  });




export default mongoose.model("Administrador", administradorSchema)