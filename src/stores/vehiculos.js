import { defineStore } from "pinia";
import axios from "axios"

export const useVehiculoStore = defineStore("vehiculo", ()=>{

    const getVehiculos = async ()=>{ 
        try {
            return axios.get("https://coofronteras.onrender.com/vehiculo")
        } catch (error) {
           
         
            throw new Error("No se pudieron obtener los vehículos");
        } 
    }

    const postVehiculo = async (datos)=>{
        try {
            return axios.post("https://coofronteras.onrender.com/vehiculo",datos)
        } catch (error) {
            throw new Error("No se pudo agregar el vehículo"); 
        }
    } 
    const editVehiculo = async (id, datos) => {
        try {
          return axios.put(`https://coofronteras.onrender.com/vehiculo/${id}`, datos);
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
