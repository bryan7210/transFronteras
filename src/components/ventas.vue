<template>
  <div class="card-container">
    <div class="card2" id="cardbus" v-if="isCardMoved">
      <button
        
        v-for="seatNumber in totalSeats"
        :key="seatNumber"
        class="seat-button"
        @click="selectSeat(seatNumber)"
        id="seat-card"
      >
      <img src="https://cdn-icons-png.flaticon.com/512/5102/5102957.png" alt="" id="img1">
        <h3 id="numasi">Asiento {{ seatNumber }}</h3>
        <!-- Puedes agregar más detalles del asiento aquí si es necesario -->
      </button>
    </div>

    <div :class="['card', { 'card-right': isCardMoved }]" id="card">
      <h1>{{ pasarMayuscula }}</h1>
      <h4>Origen</h4>
      <select name="origen" id="origen">
        <option value="" selected>seleccione...</option>
        <option v-for="opcion in opcionesOrigen" :key="opcion" :value="opcion">{{ opcion }}</option>
      </select>
      <h4>Destino</h4>
      <select name="destino" id="destino">
        <option value="seleccione" selected>Seleccione...</option>
        <option v-for="opcion in opcionesDestino" :key="opcion" :value="opcion">{{ opcion }}</option>
      </select>

      <h4>Fecha</h4>
      <input type="date" id="telefono" placeholder="Fecha...">
      <h4>Hora salida</h4>
      <input type="time" id="telefono" placeholder="Hora...">
      
      <button class="btn2" @click="moverTarjetaDerecha">Guardar</button>
    </div>
  </div>
  <div class="card11">
    <button class="btn4">
    <router-link to="/factura" class="custom-link">factura</router-link>
  </button>
  <button class="btn">
    <router-link to="/inicio" class="custom-link">nuevo</router-link>
  </button>
  </div>
   
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { useUserStore } from "../stores/user.js";
import { useRouter } from "vue-router";
import axios from "axios";

const userStore = useUserStore();
const pasarMayuscula = computed(() => userStore.userData.toUpperCase());
const router = useRouter();

// Animaciones
const isCardMoved = ref(false);

// Obtener las opciones para origen y destino desde la API
const opcionesOrigen = ref([]);
const opcionesDestino = ref([]);

const rutas = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get("./apigetrutas");
    console.log("sirve"); 
    rutas.value = response.data.rutas;
  } catch (error) {
    console.error(error);
  }
});

// Total de asientos
const totalSeats = ref(40);

// Funciones de manejo de la tarjeta
const moverTarjetaDerecha = () => {
  isCardMoved.value = true;
};

// Función para seleccionar un asiento
const selectSeat = (seatNumber) => {
  // Implementa lo que deseas hacer al seleccionar un asiento
  // Por ejemplo, podrías almacenar el número del asiento en una variable o en el estado de tu aplicación.
};
</script>




<style scoped>
#card{
  height: 550px;
}
.card11{
  margin-left: 43%;
  height: 100px;
  width: 400px;
 
}
/* Estilos base para el componente */
.card-container {
  display: flex;
  flex-wrap: wrap;
  
  justify-content: center;
  margin-top: -30px
}

.card {
  text-align: center;
  max-width: 400px;
  margin-right: 20px;
  transition: transform 1s ease;
}

.card-right {
  transform: translateX(10%);

}

/* Estilos para campos del formulario (Origen, Destino, Fecha, Hora, Precio, etc.) */
#destino,
#origen,
#telefono,
#numbus {
  height: 50px;
    width: 300px;
    background-color: white;
    color: rgb(0, 0, 0);
    border-radius: 5px;
    margin-bottom: 10px;
    margin-left: 50px;
}

/* Estilos para el botón "Guardar" */
.btn2 {
  background-color: white;
    width: 110px;
    height: 40px;
    font-size: 20px;
    margin-top: 20px;
    font-family: cursive;
    text-align: center;
    margin-left: 150px;
    border-radius: 5px;
}
.custom-link {
  text-decoration: none; /* Eliminar subrayado */
  color: black;
}
.btn2:hover {
  transform: scale(1.1);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.626);
}

/* Estilos para los botones "factura" y "nuevo" */
.btn4{
  background-color: white;
    width: 110px;
    height: 40px;
    font-size: 20px;
    margin-top: 20px;
    font-family: cursive;
    text-align: center;
    margin-left: 150px;
    border-radius: 5px;
}
.btn {
  background-color: white;
    width: 110px;
    height: 40px;
    font-size: 20px;
    margin-top: 20px;
    font-family: cursive;
    text-align: center;
    margin-left: 150px;
    border-radius: 5px;
    border-color: black;
}

.btn4:hover,
.btn:hover {
  transform: scale(1.1);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.626);
}

.card {
  width: 1800px;
  height: 600px;
  background-color: #ffdab3;
  text-align: center;
  margin-top: 50px;
}

/* Estilos para el contenedor de los asientos (opcional) */
#cardbus {
  margin-top: 50px;
  border-radius: 5px;
  
  width: 1000px;
  height: auto;
 background-color: #ffdab3;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-left: -50px;
}

/* Estilos para los asientos (opcional) */
.seat-button {
  width: 100px;
  height: 100px;
  margin: 10px;
  padding: 10px;
  background-color: #ffffff;
  border-radius: 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
  outline: none;
  font-family: cursive;
}

.seat-button:hover {
  transform: scale(1.1);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.626);
}

#numasi {
  font-size: 20px;
  margin-top: -65px;
}
#img1{
  height: 30px;
  margin-top: 35px;
}





</style>