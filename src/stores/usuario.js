import { defineStore } from "pinia";
import axios from "axios";

export const useUsuarioStore = defineStore("usuario", () => {

    const getUsuarios = async () => {
        try {
            return axios.get("https://coofronteras.onrender.com/usuario");
        } catch (error) {
            throw new Error("No se pudieron obtener los usuarios");
        }
    };

    const postUsuario = async (datos) => {
        try {
            return axios.post("https://coofronteras.onrender.com/usuario", datos);
        } catch (error) {
            throw new Error("No se pudo agregar el usuario");
        }
    };

    return {
        getUsuarios,
        postUsuario
    }; 

});
