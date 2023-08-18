import Login from "../components/Login.vue" 
import vendedor from "../components/vendedor.vue"
import admin from "../components/admin.vue"
import inicio from "../components/inicio.vue"
import ventas from "../components/ventas.vue"
import factura from "../components/factura.vue"
import vehiculos from "../components/vehiculos.vue"
import rutas from "../components/rutas.vue"
import usuarios from "../components/usuarios.vue"
import tickets from "../components/tickets.vue"
import conductores from "../components/conductores.vue"
import {createRouter, createWebHashHistory} from "vue-router"

const routes=[
    {path:"/",component: Login},
    {path:"/vendedor",component: vendedor},
    {path:"/admin",component: admin},
    {path:"/inicio",component: inicio},
    {path:"/ventas",component: ventas},
    {path:"/factura", component: factura},
    {path:"/vehiculo", component:vehiculos},
    {path:"/rutas",component:rutas},
    {path:"/usuarios",component:usuarios},
    {path:"/conductores",component:conductores},
    {path:"/ticket",component:tickets}


    
    

]

export const router = createRouter({
    history: createWebHashHistory(), 
    routes
})