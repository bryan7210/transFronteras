import { defineStore } from "pinia";
import axios from "axios"

export const useConductorStore = defineStore("conductor", ()=>{
 
    const getConductores = async ()=>{
        try {
            return axios.get("http://localhost:3100/conductor")
        } catch (error) { 
            return error
        } 
    }
    const postconductor = async (datos) => {
        try {
            return axios.post("http://localhost:3100/conductor", datos);
        } catch (error) {
            throw new Error("No se pudo agregar el conductor");
        }
    };

    return{
        getConductores, postconductor
    }
})