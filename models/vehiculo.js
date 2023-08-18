import mongoose from "mongoose"

const vehiculoSchema = new mongoose.Schema({
    matricula : {type:String, required:true, unique:true},
    num_vehiculo : {type:String, required:true, unique:true},
    propietario: {type:String, required:true, default:"empresa viajes"},
    soat : {type: String, required: true},
    tecnomecanica : {type: String, required: true},
    capacidad : {type: String, required: true}, 
    createAt : {type:Date, default:Date.now}, 
    conductor : { type: mongoose.Types.ObjectId, default: mongoose.Types.ObjectId, ref:'Conductor', required:true},
    estado: { type: Boolean, default: true } // 1 es activo y 0 inactivo
})
 
export default mongoose.model("Vehiculo", vehiculoSchema)  