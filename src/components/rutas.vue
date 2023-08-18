<template>
    <div class="card-container">
      <div class="card">
        <button class="btng " data-bs-toggle="modal" data-bs-target="#agregarModal" id="agregar">Agregar nuevo</button>
        <table id="tabla2" class="rounded-table">
          <thead>
            <tr id="tabla">
              <th>nombre ruta</th>     
              <th>origen</th>
              <th>destino</th>
              <th>estado</th>
              <th>Acciones</th>

             
            </tr>
          </thead>
          <tbody>
            <tr v-for="ruta in rutas" :key="ruta.id">
              <td>{{ ruta.nombreRuta }}</td>
              <td>{{ ruta.origen }}</td>
              <td>{{ ruta.destino }}</td>
              
              <td>
                {{ ruta.estado==1?'Activo':'Inactivo' }}
              </td>
              <td>
                <button   id="btn3">
                   {{ ruta.estado==1?'❌':'✅' }}
                </button>
                
                <button  data-bs-toggle="modal" data-bs-target="#exampleModal" id="btn1">
                  📝
                </button>
                
              </td>
            </tr>
          </tbody>
        </table>
        <button class="btng">
          <router-link to="/admin" class="custom-link ">volver</router-link>
        </button>
      </div>
    </div>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
        
       </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" >Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade" id="agregarModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Agregar rutas</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
         
          <h4>Nombre de la ruta</h4>
           <input type="text" v-model="nombreRuta" placeholder="Nombre de la ruta...">
          <h4>Origen</h4> 
           <input type="text" v-model="origen" placeholder="Origen...">
          <h4>Destino </h4>
           <input type="text" v-model="destino" placeholder="dDestino...">
          <h4>Horarios</h4> 
           <input type="time" v-model="horarios" placeholder="Horarios...">
          <h4>Tarifas</h4>
           <input type="text" v-model="tarifas" placeholder="Tarifas..."> 
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" >Cerrar</button>
          <button type="button" class="btn btn-primary" @click="enviarDatos" >agregar</button>
        </div>
      </div>
    </div>
  </div>
  
  
  </template>


<script setup>
import { ref, onMounted, computed, reactive } from "vue";
import {useRutaStore} from "../stores/ruta.js"
import { useUserStore } from "../stores/user.js";
const userStore = useUserStore();



const storeRutas  =  useRutaStore()

  const nombreRuta =ref('');
  const origen =ref('');
  const destino =ref('');
  const horarios =ref('');
  const tarifas =ref('');
  let rutas = ref([]);

  const mostrarError = ref(false);
  const errorMessage = ref('');

  
  const validarDatos = () => {
  if (!nombreRuta.value || !origen.value || !destino.value || !horarios.value || !tarifas.value) {
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
    nombreRuta: nombreRuta.value,
    origen: origen.value,
    destino: destino.value,
    horarios: horarios.value,
    tarifas: tarifas.value
  };
  console.log("Enviando datos:", data);

  try {
    let r=await storeRutas.postRuta(data)
    console.log("Respuesta del servidor:", r);
    console.log("Vehículo agregado");
    pediruta()
  } catch (error) {
    console.error("Error al enviar la solicitud:", error);
  } 
};

const pediruta = async () => {
  let r = await storeRutas.getRutas()
  rutas.value=r.data.rutas
  console.log(r.data);

};
onMounted(async () => {
  await pediruta();
});




</script>


<style scoped>
 #agregar{
  margin-top: 30px;
  margin-right: -1600px; 
}

.rounded-table {
  margin-top: 30px;
  border-collapse: separate; /* Separar los bordes de celdas */
  width: 100%; /* Ancho de la tabla */
  border-spacing: 0; /* Espaciado entre celdas */
  border-color: black;
}

.rounded-table th, .rounded-table td {
  padding: 8px; /* Espaciado interno de las celdas */
}

.rounded-table th {
  background-color: #ffdab3; /* Color de fondo para el encabezado */
}
.custom-link {
  text-decoration: none; /* Eliminar subrayado */
  color: black;
}
.rounded-table td {
  background-color: rgba(255, 252, 248, 0.313); /* Color de fondo para las celdas de datos */
}

/* Estilos para los bordes redondeados y color de borde */
.rounded-table th, .rounded-table td {
  border: 1.5px solid #ffdcab; /* Establecer un borde para las celdas */
  border-radius: 10px; /* Bordes redondeados */
}







#agregarModal{
  margin-top: 100px;
}
#exampleModal{
  margin-top: 100px;
}



#btn1{
  
  background-color: rgb(255, 250, 241);
  width: 60px;
  height: 40px;
  color: white;
  font-size: 20px;
  margin-top: 20px;
  font-family: cursive;
  text-align: center;
  border-radius: 10px;
}
.btng{
  background-color: rgb(255, 250, 241);
  
  width: 150px;
  height: 40px;
  color: rgb(0, 0, 0);
  font-size: 20px;
  margin-top: 20px;
  font-family: cursive;
  text-align: center;
  border-radius: 10px;
}
.btng:hover{
  transform: scale(1.1);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.626);
}
#btn1:hover{
  transform: scale(1.1);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.626);
}
#btn2{

  background-color: rgb(255, 250, 241);
  width: 60px;
  height: 40px;
  color: white;
  font-size: 20px;
  margin-top: 20px;
  font-family: cursive;
  text-align: center;
  border-radius: 10px;
}
#btn2:hover{
  transform: scale(1.1);
    background-color: rgba(40, 40, 40, 0.779);
}
#btn3{
 
  background-color: rgb(255, 250, 241);
  width: 60px;
  height: 40px;
  color: white;
  font-size: 20px;
  margin-top: 20px;
  font-family: cursive;
  text-align: center;
  border-radius: 10px;
}
#btn3:hover{
  transform: scale(1.1);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.626);
}



.card-container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
} 
  .card {
    width: 1800px;
    height: 800px;
    display: flex;
    align-items: center;
    border-color: rgb(255, 255, 255);
    text-align: center;
    font-family: cursive;
    
  }

  #text{
  font-size: 50px;
  }

#tabla2{
  background-color: rgba(241, 241, 241, 0.027);
  border-color: black;
  border-radius: 20px;
  width: 100%;
}
th,
td {
  border: 2px solid rgb(0, 0, 0);
border-radius: 5px;
  padding: -20px;
}

th {
  background-color: #c6c6c6;
  
}

</style>
 