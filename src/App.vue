<template>
  <q-layout view="hHh LpR lff">

    <q-header elevated class=" text-white" id="header">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar id="avarat2">
            <img src="https://icons.veryicon.com/png/o/business/official-icon-of-the-insurer/ticket-12.png" id="avatar">
          </q-avatar>
          Tickets
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" behavior="mobile" elevated id="lateral" style="background-color: rgb(255, 106, 0);">
      <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" id="btnlat"/>
      <br>
      <button id="vende" >
        <img src="https://cdn-icons-png.flaticon.com/512/4378/4378790.png" alt="" id="img1">


        <router-link to="/inicio" class="custom-link" > vender</router-link>
      </button>
      <br>
      <button id="vehicu">
        <img src="https://cdn.icon-icons.com/icons2/2387/PNG/512/car_vehicle_transport_icon_144665.png" id="img1" alt="">
        <router-link to="/vehiculo" class="custom-link">Vehiculos</router-link>
      </button>
      <br>
      <button id="ruta">
        <img src="https://cdn.icon-icons.com/icons2/771/PNG/512/route_icon-icons.com_64564.png" alt="" id="img1">
        <router-link to="/rutas" class="custom-link">rutas</router-link>
      </button>
      <br>
      <button id="usuarios">
        <img src="https://cdn-icons-png.flaticon.com/512/17/17115.png" alt="" id="img1">
        <router-link to="/usuarios" class="custom-link">Usuarios</router-link>
      </button>
      <br>
      <button id="ticket">
        <img src="https://cdn-icons-png.flaticon.com/512/785/785581.png" alt="" id="img1">
        <router-link to="/factura" class="custom-link">Tickets</router-link>
      </button>
      <br>
      <button id="conductor">
        <img src="https://cdn-icons-png.flaticon.com/512/3381/3381266.png" alt="" id="img1">
        <router-link to="/conductores" class="custom-link">Conductores</router-link>
      </button>
              
                
              
              
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>


<script setup>
import { ref } from 'vue'
import { computed } from "vue";
import { useRouter } from "vue-router";
//import { useUserStore } from "./stores/vehiculos";



//const userStore = useUserStore();
const pasarMayuscula = computed(() => userStore.userData.toUpperCase());
const router = useRouter();


const leftDrawerOpen = ref(false)

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}



</script>

<style scoped>
#text{
  font-size: 20px;
  font-family: cursive;
}
#btnlat{
  margin-left: 5px;
  margin-top: 5px;
}
#header{
  background-color: rgb(0, 179, 255);
}
#avatar{
  height: 30px;
  width: 60px;
  filter: invert(1);
}
#avarat2{
  width: 70px;
}
#lateral{
  background-color: rgb(255, 106, 0);
  font-family: cursive;
}
#header{
  background-color: rgb(255, 106, 0);
  font-family: cursive;
}
/*botones */
#vende{
  background-color: rgb(255, 255, 255);
  width: 180px;
  height: 60px;
  color: white;
  font-size: 20px;
  margin-top: 10px;
  font-family: cursive;
  text-align: center;
  border-radius: 10px;
}
#vende:hover{
  transform: scale(1.1);
  background-color: rgba(255, 255, 255, 0.779);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.626);
}

#vehicu{
  background-color: rgb(255, 255, 255);
  width: 180px;
  height: 50px;
  color: white;
  font-size: 20px;
  margin-top: 10px;
  font-family: cursive;
  text-align: center;
  border-radius: 10px;
}
#vehicu:hover{
  transform: scale(1.1);
  background-color: rgba(255, 255, 255, 0.779);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.626);
}
.custom-link {
  text-decoration: none; /* Eliminar subrayado */
  color: black;
}
#ruta{
  background-color: rgb(255, 255, 255);
  width: 180px;
  height: 60px;;
  color: white;
  font-size: 20px;
  margin-top: 10px;
  font-family: cursive;
  text-align: center;
  border-radius: 10px;
}
#ruta:hover{
  transform: scale(1.1);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.626);
}

#usuarios{
  background-color: rgb(255, 255, 255);
  width: 180px;
  height: 60px;
 
  font-size: 20px;
  margin-top: 10px;
  font-family: cursive;
  text-align: center;
  border-radius: 10px;
}
#usuarios:hover{
  transform: scale(1.1);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.626);
}

#conductor{
  background-color: rgb(255, 255, 255);
  width: 180px;
  height: 60px;
  color: white;
  font-size: 20px;
  margin-top: 10px;
  font-family: cursive;
  text-align: center;
  border-radius: 10px;
}
#conductor:hover{
  transform: scale(1.1);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.626);
}

#ticket{
  background-color: rgb(255, 255, 255);
  width: 180px;
  height: 60px;
  color: white;
  font-size: 20px;
  margin-top: 10px;
  font-family: cursive;
  text-align: center;
  border-radius: 10px;
}
#ticket:hover{
  transform: scale(1.1);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.626);
}
/*imagenes */
#img1{
  height: 35px;
  margin-left: -5px;
}
#img2{
  height: 56px;
  margin-top: -6px;
}
#img3{
height: 50px;
}
#img4{
  height: 58px;
}
#img5{
  height: 58px;
}
#img6{
  height: 58px;
}
</style>
