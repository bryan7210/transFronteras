<template>
  <div class="card-container">
    <div class="card">
      <button @click="mostrarFormulario" class="btng " data-bs-toggle="modal" data-bs-target="#agregarModal" id="agregar">Agregar nuevo</button>
      <table id="tabla2" class="rounded-table">
        <thead>
          <tr id="tabla">
            <th>nombre</th>
            <th>cedula</th>
            <th>telefono</th> 
            <th>estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="conductor in conductores" :key="conductor.id">
            <td>{{ conductor.nombre }}</td>
            <td>{{ conductor.cedula }}</td>
            <td>{{ conductor.telefono }}</td>
            <td>r
              {{ conductor.estado==1?'Activo':'Inactivo' }}
            </td>
            <td>
              <button @click="estadovehiculo"  id="btn3">
                 {{ conductor.estado==1?'❌':'✅' }}
              </button>
              
              <button @click="editarVehiculo(vehiculo.id)" data-bs-toggle="modal" data-bs-target="#exampleModal" id="btn1">
                📝
              </button>
             
            </td>
          </tr>
        </tbody>
      </table>
      <button class="btng">
        <img src="c:\Users\Asus\AppData\Local\Temp\35702.png" alt="" id="img1">
        <router-link to="/admin" class="custom-link">volver</router-link>
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
    <h4>Placa o Matricula</h4>
    <!-- <input v-model="datosVehiculo.matricula" type="text" placeholder="Placa o Matricula...">
    <h4>Propietario</h4>
    <input v-model="datosVehiculo.propietario" type="text" placeholder="Propietario...">
    <h4>Soat </h4>
    <input v-model="datosVehiculo.soat" type="text" placeholder="Número de certificado...">
    <H4>Revisión Técnico-Mecánica</H4>
    <input v-model="datosVehiculo.tecnicoMecanica" type="text" placeholder="código alfanumérico único... ">
    <h4>Capacidad</h4>
    <input v-model="datosVehiculo.capacidad" type="number" placeholder="Capacidad..."> -->
  </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="actualizarDatosVehiculo">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
<div class="modal fade" id="agregarModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Agregar conductores</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <h4>nombre </h4>
    <input type="text" v-model="nombre " placeholder="nombre...">
    <h4>cedula</h4>
    <input type="text" v-model="cedula" placeholder="cedula...">
    <h4>direccion  </h4>
    <input type="text" v-model="direccion " placeholder="direccion...">
    <h4>telefono</h4>
    <input type="text" v-model="telefono" placeholder="telefono...">
    <h4>tipo_lisencia</h4>
    <input type="text" v-model="tipo_lisencia" placeholder="tipo de lisencia...">
    <h4>vigencia</h4>
    <input type="date" v-model="vigencia" placeholder="vigencia...">
    <h4>targeta de propiedad</h4>
    <input type="text" v-model="targeta_propiedad" placeholder="targeta de propiedad...">

  
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" >Cerrar</button>
        <button type="button" class="btn btn-primary" @click="enviarDatos"  >agregar</button>
      </div>
    </div>
  </div>
</div>


</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import {useConductorStore} from "../stores/conductores.js"

import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user.js";

import axios from "axios";

const userStore = useUserStore();
const pasarMayuscula = computed(() => userStore.userData.toUpperCase());
const router = useRouter();
const conducStore = useConductorStore()


  const nombre =ref('');
  const cedula =ref('');
  const direccion=ref('');
  const telefono=ref('');
  const tipo_lisencia =ref('');
  const vigencia =ref('');
  const targeta_propiedad =ref('');
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
    obtenercondutor()
  } catch (error) { 
    console.error("Error al enviar la solicitud:", error);                    
 
  }
};

const obtenercondutor = async () => {
  try {
    let r = await conducStore.getConductores()
  console.log(r);
  conductores.value= r.data.conductores
  } catch (error) {
    console.error(error.message);
  }
};
const conductores = ref([]);
// Llamar a la función para obtener los datos de los vehículos al cargar el componente
onMounted(async () => {
  await obtenercondutor();
});

//editar vehiculos

</script>


  <style scoped>
  #img1{
    height: 35px;
  margin-left: -5px;
  }
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

.rounded-table td {
  background-color: rgba(255, 252, 248, 0.313); /* Color de fondo para las celdas de datos */
}

/* Estilos para los bordes redondeados y color de borde */
.rounded-table th, .rounded-table td {
  border: 1.5px solid #ffdcab; /* Establecer un borde para las celdas */
  border-radius: 10px; /* Bordes redondeados */
}







#agregarModal{
  margin-top: 50px;
}
#exampleModal{
  margin-top: 50px;
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

.custom-link {
  text-decoration: none; /* Eliminar subrayado */
  color: black;
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
 