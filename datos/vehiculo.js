import mongoose from "mongoose"

const vehiculoSquema = new mongoose.Schema({
    matricula : {type:String, require:true, unique:true},
    num_vehiculo : {type:String, require:true, unique:true},
    propietario: {type:String, require:true, default:"empresa viajes"},
    targeta_propiedad: {type:String, require:true},
    createAt: {type:Date, default:Date.now},
    conductor: {type:mongoose.Schema.Types.ObjectId, ref:'conductor', require:true},
    revision: {type:mongoose.Schema.Types.ObjectId, ref:'revision', require: true}
})

export default mongoose.model("Vehiculo", vehiculoSquema)