import { defineStore } from "pinia";
import axios from "axios"

export const useclienteStore = defineStore("cliente", ()=>{

    const agregarCliente=async (datos)=>{
        try {
            return axios.post("https://coofronteras.onrender.com/cliente",datos)
        } catch (error) {
            return error
        }
    }
    const getCliente = async () => {
        try {
            return axios.get("https://coofronteras.onrender.com/cliente");
        } catch (error) {
            throw new Error("No se pudieron obtener los cliente");
        }
    };

    return{
         agregarCliente ,getCliente
    }

}) 