import mongoose from "mongoose"

const ticketSquema = new mongoose.Schema({
    numeroTicket: {type: String, required: true},
    fechaReserva: {type: Date, default: Date.now},
    numeroAsiento: {type: String},
    estadoTicket: {type: String},
    valorTicket: {type: Number},
    busAsignado: {type: String, required: true},
    consductor: {type: String},
    administrador: {type: String, required: true},
    cliente: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    estado: {type: Number, default: 1}
})

export default mongoose.model("Ticket", ticketSquema)