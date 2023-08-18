<template>
  <div class="card-container">
    <div class="card">
      <button @click="mostrarFormulario" class="btng " data-bs-toggle="modal" data-bs-target="#agregarModal" id="agregar">Agregar nuevo</button>
      <table id="tabla2" class="rounded-table">
        <thead>
          <tr id="tabla">
            <th>cedula</th>
            <th>nombre</th> 
            <th>apellido</th>
            <th>estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="usuari in usuarios" :key="usuari.id">
            <td>{{ usuari.cedula }}</td>
            <td>{{ usuari.nombre}}</td>
            <td>{{ usuari.apellido }}</td>
            <td>
              {{ usuari.estado==1?'Activo':'Inactivo' }}
            </td>
            <td>
              <button @click="estadovehiculo"  id="btn3">
                 {{ usuari.estado==1?'❌':'✅' }}
              </button>
              
              <button @click="editarVehiculo(vehiculo.id)" data-bs-toggle="modal" data-bs-target="#exampleModal" id="btn1">
                📝
              </button>
          
            </td>
          </tr>
        </tbody>
      </table>
      <button class="btng">
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
        <h1 class="modal-title fs-5" id="exampleModalLabel">Agregar usuarios</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <h4>cedula</h4>
    <input type="text" v-model="cedula" placeholder="cedula...">
    <h4>nombre</h4>
    <input type="text" v-model="nombre" placeholder="nombre...">
    <h4>apellido</h4>
    <input type="text" v-model="apellido" placeholder="apellido...">
    <h4>direccion</h4>
    <input type="text" v-model="direccion" placeholder="cdireccion...">
    <h4>correo electronico</h4>
    <input type="text" v-model="email" placeholder="correo electronico...">
    <h4>telefono</h4>
    <input type="text" v-model="telefono" placeholder="telefono...">

  
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

import {useUsuarioStore} from "../stores/usuario.js"
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user.js";

import axios from "axios";

const userStore = useUserStore();
const pasarMayuscula = computed(() => userStore.userData.toUpperCase());
const router = useRouter();





  let UsuarioStore  =  useUsuarioStore()
  const cedula =ref('');
  const nombre =ref('');
  const apellido =ref('');
  const direccion =ref('');
  const email =ref('');
  
  const telefono =ref('');
  let usuarios=ref([])
  const mostrarError = ref(false);
  const errorMessage = ref('');
  
  
  const validarDatos = () => {
  if (!cedula.value || !nombre.value || !apellido.value  || !direccion.value  || !email.value  || !telefono.value ) {
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
console.log("pasando");

  const data = {
    cedula: cedula.value,
    nombre: nombre.value,
    apellido: apellido.value,
    direccion: direccion.value,
    email: email.value,
    telefono: telefono.value

  };
  console.log("Enviando datos:", data);
  try {
    let r = await UsuarioStore.postUsuario(data);
    console.log("Respuesta del servidor:", r);
    console.log("Vehículo agregado");
    obtenerusuario()
  } catch (error) { 
    console.error("Error al enviar la solicitud:", error);
  }
};
// Función para obtener los datos de los vehículos desde la API
const obtenerusuario = async () => {
  let r = await UsuarioStore.getUsuarios()
  usuarios.value=r.data.usuarios
  console.log(r.data);
};

// Llamar a la función para obtener los datos de los vehículos al cargar el componente
onMounted(async () => {
  await obtenerusuario();
});

//editar vehiculos

</script>



  <style scoped>



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
  margin-top: 100px;
}
#exampleModal{
  margin-top: 100px;
}

#agregar{
  margin-top: 30px;
  margin-right: -1600px; 
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
  #text{
  font-size: 50px;
}
.custom-link {
  text-decoration: none; /* Eliminar subrayado */
  color: black;
}
</style>
 