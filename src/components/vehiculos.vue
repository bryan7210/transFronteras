<template>
  <div class="card-container">
    <div class="card">
      <button @click="mostrarFormulario()" class="btng " data-bs-toggle="modal" data-bs-target="#agregarModal" id="agregar">Agregar nuevo</button>
      <table id="tabla2" class="rounded-table">
        <thead>
          <tr id="tabla">
            <th>Placa</th>
            <th>Número</th>
            <th>dueño</th> 
            
            <th>estado</th>
            <th>Acciones</th> 
          </tr> 
        </thead> 
        <tbody>
          <tr v-for="vehiculo in vehiculos" :key="vehiculo.id">
            <td>{{ vehiculo.matricula }}</td>
            <td>{{ vehiculo.num_vehiculo }}</td>
            <td>{{ vehiculo.propietario }}</td>
          
            <td>
              {{ vehiculo.estado==true ?'Activo':'Inactivo' }}
            </td>
            <td>
              <button @click="estadovehiculo"  id="btn3">
                 {{ vehiculo.estado==true?'❌':'✅' }}
              </button>
              
              <button @click="editarVehiculo(vehiculo)" data-bs-toggle="modal" data-bs-target="#exampleModal" id="btn1">
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
        <h1 class="modal-title fs-5" id="exampleModalLabel">editar vehiculos</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form @submit.prevent="editarVehiculo">
        <h4>Placa o Matricula</h4>
      <input type="text" v-model="matricula" placeholder="Placa o Matricula..." />

      <h4>Propietario</h4>
      <input type="text" v-model="propietario" placeholder="Propietario..." />

      <h4>Soat</h4>
      <input type="text" v-model="soat" placeholder="Número de certificado..." />

      <h4>Revisión Técnico-Mecánica</h4>
      <input type="text" v-model="tecnomecanica" placeholder="código alfanumérico único..." />

      <h4>Capacidad</h4>
      <input type="text" v-model="capasidad" placeholder="Capacidad..." />

      <h4>Número de Vehículo</h4>
      <input type="text" v-model="num_vehiculo" placeholder="Número de Vehículo..." />

      
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" >Close</button>
        <button type="submit" class="btn btn-primary" @click="editarUsers()">Guardar cambios
   
        </button>
      </div>
    </form>
    </div>
  </div>
</div>
</div>
<div class="modal fade" id="agregarModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Agregar vehiculo</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <h4>Placa o Matricula</h4>
    <input type="text" v-model="matricula" placeholder="Placa o Matricula...">
    <h4>Propietario</h4>
    <input type="text" v-model="propietario" placeholder="Propietario...">
    <h4>Soat </h4>
    <input type="text" v-model="soat" placeholder="Número de certificado...">
    <h4>Revisión Técnico-Mecánica</h4>
    <input type="text" v-model="tecnomecanica" placeholder="código alfanumérico único...">
    <h4>Capacidad</h4>
    <input type="text" v-model="capasidad" placeholder="Capacidad...">
    <h4>num vehiculo</h4>
    <input type="text" v-model="num_vehiculo" placeholder="num vehiculo...">
    <h4>Conductor</h4>
    <select v-model="conduc">
      <option value="" disabled selected>Seleccione...</option>
      <option :value="c._id" v-for="(c,i) in conductores" :key="i">{{ c.nombre }}</option>
    </select>
  
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
import { ref, computed, onMounted } from "vue";; // Asegúrate de proporcionar la ruta correcta
import { useVehiculoStore } from "../stores/vehiculos.js"; // Importa tu store de vehículos
import { useConductorStore } from "../stores/conductores.js"; // Importa tu store de conductores
const storeVehiculos = useVehiculoStore();
const storeConductores = useConductorStore();
const matricula = ref('');
const propietario = ref('');
const soat = ref('');
const tecnomecanica = ref('');
const capasidad = ref('');
const num_vehiculo = ref('');
const conductores = ref([]);
const conductor = ref([]);
const conduc = ref('');
const vehiculos = ref([]);
const errorMessage = ref('');
const mostrarError = ref(false);
let indice =ref(null)


const validarDatos = () => {
  if (!matricula.value || !propietario.value || !soat.value || !tecnomecanica.value || !capasidad.value || !num_vehiculo.value || !conduc.value) {
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
    matricula: matricula.value,
    propietario: propietario.value,
    soat: soat.value,
    tecnomecanica: tecnomecanica.value,
    capacidad: capasidad.value,
    num_vehiculo: num_vehiculo.value,
    conductor: conduc.value
  };

  try {
    await storeVehiculos.postVehiculo(data);
    console.log("Vehículo agregado");
    obtenerVehiculos();
  } catch (error) {
    console.error("Error al enviar la solicitud:", error);
  }
};
const obtenerVehiculos = async () => {
  let r = await storeVehiculos.getVehiculos();
  mostrarFormulario()
  vehiculos.value = r.data.vehiculos;
  console.log(r.data);
};

onMounted(async () => {
  await obtenerVehiculos();
});
const mostrarFormulario = async () => {
  let r = await storeConductores.getConductores();
  console.log(r);
  conductores.value = r.data.conductores;
};


//editar

async function editarUsers() {
  console.log("pasando");
  console.log();
  
    let r = await storeVehiculos.editVehiculo(indice.value, {
   
        matricula: matricula.value,
        propietario: propietario.value,
        soat: soat.value,
        tecnomecanica: tecnomecanica.value,
        capasidad: capasidad.value,
        num_vehiculo: num_vehiculo.value,
       

        
    })
   
    
    console.log(r);
    limpiarCampos();
    obtenerVehiculos();
    

}
async function editarVehiculo  (r) {

    matricula.value = r.matricula
    propietario.value = r.propietario
    indice.value=r.id
    soat.value = r.soat
    tecnomecanica.value = r.tecnomecanica
    capasidad.value = r.capacidad
    num_vehiculo.value = r.num_vehiculo

}

const limpiarCampos = async () => {
  matricula.value = '';
  propietario.value = '';
  soat.value = '';
  tecnomecanica.value = '';
  capasidad.value = '';
  num_vehiculo.value = '';

  obtenerVehiculos();
};
</script>






<style scoped>
select option:first-child {
    position: absolute;
    display: none;
  }

  select:focus-within option:first-child {
    display: block;
    color: gray;
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
  margin-left: 25px;
  margin-right: 25px;
}

.rounded-table th, .rounded-table td {
  padding: 8px; /* Espaciado interno de las celdas */
  margin-left: 25px;
  margin-right: 25px;
  font-size: 20px;
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
  margin-top: 50px;
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