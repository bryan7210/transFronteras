import mongoose from "mongoose"

const usuarioSchema = new mongoose.Schema({
    cedula: { type: String, required: true, unique: true},
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    direccion: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    telefono: { type: String, required: true, unique: true },
    createAd: { type: Date, required: true, default: Date.now },
    estado: {type: Boolean, default: true},
    password:{type: String, default: "admin123"}
  });

  export default mongoose.model("Usuario", usuarioSchema)