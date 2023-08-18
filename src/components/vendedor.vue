<template>
  <div class="card-container">
    <div class="card">
      <h1>{{ pasarMayuscula }}</h1>
      <h4>Nombre</h4>
      <input type="text" id="nombre" v-model="nombre" placeholder="Nombre...">
      <h4>Cédula</h4>
      <input type="text" id="nombre" v-model="cedula" placeholder="Cédula...">
      <h4>Teléfono</h4>
      <input type="text" id="nombre" v-model="telefono" placeholder="Teléfono...">
      <button class="btn2" @click="enviarDatos">Registrar</button>
      <div v-if="mostrarError" class="error">{{ errorMessage }}</div>
    </div>
  </div>
  <button class="btn">
    <router-link to="/" class="custom-link">salir</router-link>
  </button>
</template>
<script setup>
import { ref, computed } from "vue";
import { useUserStore } from "../stores/user.js";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const pasarMayuscula = computed(() => userStore.userData.toUpperCase());
const router = useRouter();

import { useclienteStore } from '../stores/clientes.js';
const storecliente = useclienteStore();

const nombre = ref(''); 
const cedula = ref('');
const telefono = ref('');

const mostrarError = ref(false);
const errorMessage = ref('');

const validarDatos = () => {
  if (!nombre.value || !cedula.value || !telefono.value) {
    mostrarError.value = true;
    errorMessage.value = 'Por favor, ingresa todos los datos.';
    return false;
  }
  return true;
};

const enviarDatos = async () => {
  if (!validarDatos()) {
    return;
  }

  const data = {
    nombre: nombre.value,
    cedula: cedula.value,
    telefono: telefono.value
  };

  try {
  const response = await storecliente.agregarCliente(data);
  console.log('Respuesta del servidor:', response.data);
  
  if (response.data.mensaje === "1 cliente insertado!!") {
    router.push("/ventas");
  } else {
    // Mostrar notificación de error en caso necesario
  }
} catch (error) {
  console.error('Error al enviar la solicitud:', error);
  // Mostrar notificación de error en caso necesario
}
};

</script>










<style scoped>
.error {
    color: red;
    font-weight: bold;
  }
.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 50px;
  align-items: center;
}

.card {
  margin-top: 5%;
  text-align: center;
  max-width: 400px; 
  margin-right: 20px; 
  text-align: center;
  background-color: #ffdab3;
    border-radius: 10px;
    border-color: rgb(137, 137, 137);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.418);;
    max-width: 400px; 
    margin-right: 20px;
    width: 1800px;
  height: 460px;
}


#nombre, #cedula, #telefono {
  height: 50px;
    width: 300px;
    
    background-color: white;
    color: rgb(0, 0, 0);
    border-radius: 5px;
    margin-bottom: 10px;
    margin-left: 50px;  
}
#nombre:hover{
  
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.626);
}
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
  .btn3:hover {
    transform: scale(1.1);
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.626);
  }


.btn {
    background-color: rgb(255, 255, 255);
    width: 70px;
    height: 40px;
    display: flex;
    text-align: center;

    border-radius: 5px;
    font-size: 20px;
    font-family: cursive;
    display: flex;
   margin-left: 48%;
   margin-top: 50px;
    border-color: rgb(81, 81, 81);
  }
  .btn:hover {
    transform: scale(1.1);
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.626);
  }
  




</style>
