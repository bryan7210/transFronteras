import mongoose from "mongoose"

const usuarioSchema = new mongoose.Schema({
    cc: { type: String},
    nombre: { type: String },
    apellido: { type: String },
    clave: { type: String },
    direccion: { type: String },
    correo_electronico: { type: String },
    numero_telefono: { type: String },
    fecha_creacion: { type: Date },
    estado: { type: String }
  });

  export default mongoose.model("Usuario", usuarioSchema)