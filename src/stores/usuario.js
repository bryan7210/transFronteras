import { defineStore } from "pinia";
import axios from "axios";

export const useUsuarioStore = defineStore("usuario", () => {

    const getUsuarios = async () => {
        try {
            return axios.get("http://localhost:3100/usuario");
        } catch (error) {
            throw new Error("No se pudieron obtener los usuarios");
        }
    };

    const postUsuario = async (datos) => {
        try {
            return axios.post("http://localhost:3100/usuario", datos);
        } catch (error) {
            throw new Error("No se pudo agregar el usuario");
        }
    };

    return {
        getUsuarios,
        postUsuario
    }; 

});
