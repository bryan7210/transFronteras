import { defineStore } from "pinia";
import axios from "axios";

export const useTicketStore = defineStore("ticket", () => {

    const getTickets = async () => {
        try {
            return axios.get("https://coofronteras.onrender.com/tikeck");
        } catch (error) {
            throw new Error("No se pudieron obtener los tickets");
        }
    };

    const postTicket = async (datos) => {
        try {
            return axios.post("https://coofronteras.onrender.com/tikeck", datos);
        } catch (error) {
            throw new Error("No se pudo agregar el ticket");
        }
    };

    return {
        getTickets,
        postTicket
    };

});
