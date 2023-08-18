import mongoose from "mongoose"

const clienteSchema = new mongoose.Schema({
    nombre: {type: String, required: true },
    cedula: {type: String, required: true, unique: true},
    telefono: {type: Number, required: true,},
    createdAt: {type: Date, default: Date.now},
    estado: {type: Boolean, default: true} // 0 es Inactivo, 1 es Activo
})

export default mongoose.model("Cliente", clienteSchema)