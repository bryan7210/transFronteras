import mongoose from "mongoose"

const vendedorSchema = new mongoose.Schema({
    cedula: { type: Number, required: true, unique: true},
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    password: { type: String, required: true },
    direccion: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    telefono: { type: String, required: true, unique: true },
    estado: {type: Boolean, default: true}
  });

  export default mongoose.model("Vendedor", vendedorSchema)