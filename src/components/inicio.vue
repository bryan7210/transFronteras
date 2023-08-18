<template>
  <div class="card-container">
    <div class="card">
      <h1>{{ pasarMayuscula }}</h1>
      <h1 id="text">Cédula</h1>
      <input v-model="cedula" type="number" id="cedula" placeholder="Cédula..." />
      <button class="btn2 custom-link" @click="verificarCedula">Guardar</button>
        <button class="btn3" @click="vender" v-if="habilitarRegistrar">
        <router-link to="/vendedor" class="custom-link">Registrar</router-link>
      </button>
      
      
      <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
    </div>
  </div>
  <div class="card54">
    <button class="btn">
      <router-link to="/admin" class="custom-link">volver</router-link>
    </button>
  </div>
</template>


<script setup>
import { ref, computed } from "vue";
import { useUserStore } from "../stores/user.js";
import { useRouter } from "vue-router";
import {useclienteStore} from "../stores/clientes.js"
const userStore = useUserStore();
const pasarMayuscula = computed(() => userStore.userData.toUpperCase());
const router = useRouter();

let clientestore =useclienteStore()
let clientes =ref([]);
const cedulasRegistradas = ref([]);
const cedula = ref("");
const habilitarRegistrar = ref(false);
const errorMessage = ref(""); // Variable para almacenar el mensaje de error

const mostrarFormulario =async ()=>{
  let r = await clientestore.getCliente()
  console.log(r);
  clientes.value= r.data.clientes
}




const obtenerCedulasRegistradas = async () => {
  try {
    const response = await  mostrarFormulario();
    console.log(response); 

    
    if (Array.isArray(response.clientes)) {

      cedulasRegistradas.value = response.clientes.map((cliente) => cliente.cedula.toString());
      console.log('Cédulas registradas:', cedulasRegistradas.value);
    } else {
      // Si la propiedad "clientes" no es un array válido, lanzar un error o manejarlo según corresponda
      throw new Error('La respuesta de la API no contiene un array de clientes válido.');
    }
  } catch (error) {
    console.error('Error al obtener cédulas registradas:', error);
  }
};

obtenerCedulasRegistradas();

const verificarCedula = () => {
  const cedulaIngresada = cedula.value.toString(); // Convertir la cédula ingresada a cadena de texto
  console.log('Cédula ingresada:', cedulaIngresada);
  console.log('Cédulas registradas:', cedulasRegistradas.value);
  if (cedulasRegistradas.value.includes(cedulaIngresada)) {
    console.log('Cédula válida. Redireccionando a ventas...');
    router.push("/ventas");
  } else {
    console.log('Cédula no válida. Habilitando botón de registrar...');
    habilitarRegistrar.value = true;
    errorMessage.value = "Cédula no válida. Intente nuevamente.";
  }
};

const registrar = () => {
  console.log('Redireccionando a vendedor...');
  router.push("/vendedor");
};
</script>
  

  



<style scoped>
  .error {
  color: red;
}
  .card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 100px;
    
  }
  #text{
    font-size: 50px;
  font-family: cursive;
  }
  
  .card {
    width: 500px;
    height: 360px;
   
    text-align: center;
    border-radius: 10px;
  background-color: #ffdab3;
  border-color: rgb(137, 137, 137);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.418);;
    max-width: 400px; 
    margin-right: 20px; 
  }
  .card54{
    
    align-items: center;
    display: flex;
    margin-top: 50px;
    justify-content: center;

  }
  
  #cedula{
    height: 50px;
    width: 300px;
    background-color: white;
    color: rgb(0, 0, 0);
    border-radius: 5px;
    margin-bottom: 10px;
    margin-left: 50px; 
  }
  
  .btn2 {
    background-color: white;
    width: 100px;
    height: 40px;
  
    font-size: 20px;
    margin-top: 20px;
    font-family: cursive;
    text-align: center;
    margin-left: 150px;
    border-radius: 5px;
  }
  .btn3 {
    background-color: rgb(255, 255, 255);
    width: 105px;
    height: 40px;
    color: white;
    font-size: 20px;
    margin-top: 20px;
    font-family: cursive;
    text-align: center;
    margin-left: 146px;
    border-radius: 5px;
    border-color: black;
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
    width: 100px;
    height: 40px;
    display: flex;
    text-align: center;
    border-radius: 5px;
    font-size: 20px;
    font-family: cursive;
    border-color: rgb(0, 0, 0);
  }
  .btn:hover {
    transform: scale(1.1);
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.626);
  }
  
  

  </style>