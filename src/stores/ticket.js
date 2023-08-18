import { defineStore } from "pinia";
import axios from "axios";

export const useTicketStore = defineStore("ticket", () => {

    const getTickets = async () => {
        try {
            return axios.get("http://localhost:3100/tikeck");
        } catch (error) {
            throw new Error("No se pudieron obtener los tickets");
        }
    };

    const postTicket = async (datos) => {
        try {
            return axios.post("http://localhost:3100/tikeck", datos);
        } catch (error) {
            throw new Error("No se pudo agregar el ticket");
        }
    };

    return {
        getTickets,
        postTicket
    };

});
