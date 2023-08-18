<template>
    <div class="card-container">
        <div class="card">
            <div class="card2">
              <table id="tabla2" class="rounded-table">
        <thead>
          <tr id="tabla">
            <th>Reserva</th>
            <th>Asiento</th> 
            <th>Cliente</th>
            <th>Bus asignado</th>

            <th>estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="usuari in tikecks" :key="usuari.id">
            <td>{{ usuari.reserva }}</td>
            <td>{{ usuari.asiento}}</td>
            <td> {{ usuari.cliente }}</td>
            <td>{{ usuari.busAsignado }}</td>
            <td>{{ usuari.estadoTicket==1?'Activo':'Inactivo' }}</td>
            <td>
              <button @click="estadovehiculo"  id="btn3">
                 {{ cliente.estadoTicket==1?'❌':'✅' }}
              </button>
              
              <button @click="editarVehiculo(vehiculo.id)" data-bs-toggle="modal" data-bs-target="#exampleModal" id="btn3">
                🎫
              </button>
             
            </td>
          </tr>
        </tbody>
      </table>
              </div>

        </div>
    </div>
    <div id="boton">
      <button class="btn">
      <router-link to="/inicio" class="custom-link">nuevo</router-link>

    </button>
    <button class="btng">
        <img src="c:\Users\Asus\AppData\Local\Temp\35702.png" alt="" id="img1">
        <router-link to="/admin" class="custom-link">Volver al inicio</router-link>
      </button>
    </div>
    
  </template>
  <script setup>
  import { computed, ref, onMounted } from "vue";
 import { useUserStore } from "../stores/user.js";
  import { useRouter } from "vue-router";
  import {useTicketStore} from "../stores/ticket.js"


  
  
  

const TicketStore = useTicketStore()


  const reserva =ref('');
  const asiento =ref('');
  const estadoTicket=ref('');
  const busAsignado=ref('');
  const cliente =ref('');
  const valorTicket =ref('');

  const mostrarError = ref(false);
  const errorMessage = ref('');

  
  const validarDatos = () => {
  if (!nombre.value || !cedula.value || !direccion.value  || !telefono.value  || ! tipo_lisencia.value  || !vigencia.value  || !targeta_propiedad.value) {
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
    cedula : cedula .value,
    direccion: direccion.value,
    telefono: telefono.value,
    tipo_lisencia: tipo_lisencia.value,
    vigencia: vigencia.value,
    targeta_propiedad: targeta_propiedad.value
  };

  try {
    let r = await conducStore.postconductor(data);
    console.log("Respuesta del servidor:", r);
    console.log("Vehículo agregado");
    obtenerticket()
  } catch (error) { 
    console.error("Error al enviar la solicitud:", error);                    
 
  }
};

const obtenerticket = async () => {
  try {
    let r = await TicketStore.getTickets()
  console.log(r);
  tikecks.value= r.data.tikecks
  } catch (error) {
    console.error(error.message);
  }
};
const tikecks = ref([]);
// Llamar a la función para obtener los datos de los vehículos al cargar el componente
onMounted(async () => {
  await obtenerticket();
});
  
  
  
  </script>
  <style scoped>
 .card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.card {
    width: 90%;
    height: 750px;
    border-color: white;
    text-align: center;
    margin-top: 20px;
  }
.btn {
  background-color: rgb(255, 250, 241);
  
  width: 150px;
  height: 40px;
  color: rgb(0, 0, 0);
  font-size: 20px;
  
  font-family: cursive;
  text-align: center;
  border-radius: 10px;
  margin-left: 150%;

   
  }
  .btn:hover {
    transform: scale(1.1);
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.626);
  } 
  #text{
  font-size: 50px;
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
.btng{
  background-color: rgb(255, 250, 241);
  margin-left: 150px;
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
#btn3:hover{
 transform: scale(1.1);
 box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.626);
}
#tabla2{
  background-color: rgba(241, 241, 241, 0.027);
  border-color: black;
  border-radius: 20px;
  width: 100%;
}
  #boton{
    
    height: 60px;
    width: 100px;
    margin-left: 740px;
  }
  .custom-link {
  text-decoration: none; /* Eliminar subrayado */
  color: black;
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

.rounded-table td { 
  background-color: rgba(255, 252, 248, 0.313); /* Color de fondo para las celdas de datos */
}

/* Estilos para los bordes redondeados y color de borde */
.rounded-table th, .rounded-table td {
  border: 1.5px solid #ffdcab; /* Establecer un borde para las celdas */
  border-radius: 10px; /* Bordes redondeados */
}
  </style>