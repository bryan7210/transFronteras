import mongoose from "mongoose"

const ticketSquema = new mongoose.Schema({
    reserva: {type: String, default: Date.now},
    asiento: {type: String},
    estadoTicket: {type: String, default: 1}, 
    busAsignado: {type: String, required: true},
    cliente: {type: String, required: true},
    createdAt: {type: Date, default: Date.now}, 
    valorTicket:{type:String,required:true},
    estado: {type: Boolean, default: true}
})

export default mongoose.model("Ticket", ticketSquema) 