import express from "express"
import administrador from "../src/routes/administrador.js"
import cliente from "../src/routes/cliente.js"
import conductor from "../src/routes/conductor.js"
import ruta from "../src/routes/rutas.js"
import tikeck from "../src/routes/tikeck.js"
import vehiculo from "../src/routes/vehiculo.js"
import vendedor from "../src/routes/vendedor.js"
import usuario from "../src/routes/usuario.js"
import mongoose from "mongoose"
import cors from "cors"

class Server {
    constructor() {
        this.app = express()
        this.middlewares()
        this.routes()
        this.conectar()
    }

    routes() {
        this.app.use('/administrador', administrador)
        this.app.use('/cliente', cliente)
        this.app.use('/conductor', conductor)
        this.app.use('/ruta', ruta)
        this.app.use('/tikeck', tikeck)
        this.app.use('/vehiculo', vehiculo)
        this.app.use('/vendedor', vendedor)
        this.app.use('/usuario', usuario)
    }

    middlewares() {
        this.app.use(express.static('public'))
        this.app.use(express.json())
        this.app.use(cors())
    }

    escuchar() {
        this.app.listen(process.env.PORT, () => {
            console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
        })
    }

    conectar() {
        mongoose.connect(process.env.MONGODB)
            .then(() => console.log("coneccion exitosa"));
    }
}

export default Server
