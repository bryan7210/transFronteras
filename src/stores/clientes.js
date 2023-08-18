import { defineStore } from "pinia";
import axios from "axios"

export const useclienteStore = defineStore("cliente", ()=>{

    const agregarCliente=async (datos)=>{
        try {
            return axios.post("http://localhost:3100/cliente",datos)
        } catch (error) {
            return error
        }
    }
    const getCliente = async () => {
        try {
            return axios.get("http://localhost:3100/cliente");
        } catch (error) {
            throw new Error("No se pudieron obtener los cliente");
        }
    };

    return{
         agregarCliente ,getCliente
    }

}) 