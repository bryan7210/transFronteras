import { defineStore } from "pinia";
import axios from "axios"

export const useVehiculoStore = defineStore("vehiculo", ()=>{

    const getVehiculos = async ()=>{ 
        try {
            return axios.get("http://localhost:3100/vehiculo")
        } catch (error) {
           
         
            throw new Error("No se pudieron obtener los vehículos");
        } 
    }

    const postVehiculo = async (datos)=>{
        try {
            return axios.post("http://localhost:3100/vehiculo",datos)
        } catch (error) {
            throw new Error("No se pudo agregar el vehículo"); 
        }
    } 
    const editVehiculo = async (id, datos) => {
        try {
          return axios.put(`http://localhost:3100/vehiculo/${id}`, datos);
        } catch (error) {
          throw new Error("No se pudo editar el vehículo");
        }
      };
 
    return{
        getVehiculos,
        postVehiculo, 
        editVehiculo
    }

})
