import { defineStore } from "pinia";
import axios from "axios";

export const useRutaStore = defineStore("ruta", () => {

    const getRutas = async () => {
        try {
            return axios.get("https://coofronteras.onrender.com/ruta");
        } catch (error) {
            throw new Error("No se pudieron obtener las rutas");
        }
    };

    const postRuta = async (datos) => {
        try {
            return axios.post("https://coofronteras.onrender.com/ruta", datos);
        } catch (error) {
            throw new Error("No se pudo agregar la ruta");
        }
    };

    return {
        getRutas,
        postRuta
    };

});
