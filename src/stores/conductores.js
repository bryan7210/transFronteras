import { defineStore } from "pinia";
import axios from "axios"

export const useConductorStore = defineStore("conductor", ()=>{
 
    const getConductores = async ()=>{
        try {
            return axios.get("https://coofronteras.onrender.com/conductor")
        } catch (error) { 
            return error
        } 
    }
    const postconductor = async (datos) => {
        try {
            return axios.post("https://coofronteras.onrender.com/conductor", datos);
        } catch (error) {
            throw new Error("No se pudo agregar el conductor");
        }
    };

    return{
        getConductores, postconductor
    }
})