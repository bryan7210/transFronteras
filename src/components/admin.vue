<template>
  <div class="card-container">
      <div class="card">
          <div class="card2">
            <div class="card4">
              <img src="https://cdn-icons-png.flaticon.com/512/4378/4378790.png" alt="" id="img1">
              <h1 id="text1"> Vender</h1>
                <button id="vende" >
                  <router-link to="/inicio" class="custom-link" >Vender</router-link>
                </button>
            </div>
              <div class="card5"> 
                <img src="https://cdn.icon-icons.com/icons2/2387/PNG/512/car_vehicle_transport_icon_144665.png" id="img2" alt="">
                <h1 id="text2"> Vehiculos</h1>
              <button id="vehicu"><router-link to="/vehiculo" class="custom-link">Vehiculos</router-link></button>
              </div>
              <div class="card6">
                <img src="https://cdn.icon-icons.com/icons2/771/PNG/512/route_icon-icons.com_64564.png" alt="" id="img3">
                <h1 id="text3">Rutas</h1>
                <button id="ruta"><router-link to="/rutas" class="custom-link">Rutas</router-link></button>
              </div>
              <div class="card7">
                <img src="https://cdn-icons-png.flaticon.com/512/17/17115.png" alt="" id="img4">
                <h1 id="text4"> Usuarios</h1>
                <button id="usuarios"><router-link to="/usuarios" class="custom-link">Usuarios</router-link></button>
                
              </div>
              
              <div class="card9">
                <img src="https://cdn-icons-png.flaticon.com/512/3381/3381266.png" alt="" id="img5">
                <h1 id="text8"> Conductores</h1>
               
                <button id="conductor"><router-link to="/conductores" class="custom-link">Conductores</router-link></button>
              </div>
              <div class="card10">
                <img src="https://cdn-icons-png.flaticon.com/512/785/785581.png" alt="" id="img5">
                <h1 id="text8"> Tickets</h1>
               
                <button id="ticket">
                  <router-link to="/factura" class="custom-link">Tickets</router-link></button>
              </div>
              
              <div class="card11">
                <button class="btn11">
                  <img src="https://cdn-icons-png.flaticon.com/512/152/152534.png" alt="" id="img52">
                 <router-link to="/" class="custom-link">Salir</router-link>
                </button>

              </div>
              
         
          </div>
          
      </div>
      
  </div>
  
 
  
</template>
<script setup>
import { computed, ref } from "vue";
//import { useUserStore } from "../stores/vehiculos";
import { useRouter } from "vue-router";
//const userStore = useUserStore();
const pasarMayuscula = computed(() => userStore.userData.toUpperCase());
const router = useRouter();
</script>
<style scoped>
/*cards */
.card-container {
display: flex;
flex-wrap: wrap;
justify-content: center;
}
.card {
  width: 1500px;
  height: 690px;
  background-color: #ffffff00;
  border-color: white;
  text-align: center;
 margin-top: -70px;
  justify-content: center;
}

/* VENTAS */
.card4 {
  width: 350px;
  height: 250px;
  background-color: #ffffff;
  border-color: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.418);
  text-align: center;
 margin-top: 170px;
  border-radius: 10px;
  margin-left: 60px;
  align-items: center;
}
#img1{
  width: 120px;

}
#text1{
  margin-top: -20px;
  font-size: 50px;
  font-family: cursive;
}
#vende{
  background-color: rgb(255, 255, 255);
  width: 150px;
  height: 40px;
  color: white;
  font-size: 20px;
  margin-top: -30px;
  font-family: cursive;
  text-align: center;
  border-radius: 10px;
}
#vende:hover{
  transform: scale(1.1);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.626);
}

/* VEHICULOS */
.card5{
  width: 350px;
  height: 250px;
  background-color: #ffffff;
  border-color: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.418);
  text-align: center;
 margin-top: -250px;
  border-radius: 10px;
  margin-left: 550px;
  align-items: center;
  
}
#img2{
  width: 150px;
  margin-top: -10px;
}
#text2{
  margin-top: -40px;
  font-size: 50px;
  font-family: cursive;
}
#vehicu{
  background-color: rgb(255, 255, 255);
  width: 150px;
  height: 40px;
  color: white;
  font-size: 20px;
  margin-top: -20px;
  font-family: cursive;
  text-align: center;
  border-radius: 10px;
}
#vehicu:hover{
  transform: scale(1.1);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.626);
}
/*rutas */
.card6{
  width: 350px;
  height: 250px;
  background-color: #ffffff;
  border-color: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.418);
  text-align: center;
  margin-top: -250px;
  border-radius: 10px;
  margin-left: 1050px;
}
#img3{
  width: 120px;
  margin-top: 5px;
}
#text3{
  margin-top: -20px;
  font-size: 50px;
  font-family: cursive;
}
#ruta{
  background-color: rgb(255, 255, 255);
  width: 150px;
  height: 40px;
  color: white;
  font-size: 20px;
  margin-top: -80px;
  font-family: cursive;
  text-align: center;
  border-radius: 10px;
}
#ruta:hover{
  transform: scale(1.1);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.626);
}
/*usuarios */
.card7{ 
  width: 350px;
  height: 250px;
  background-color: #ffffff;
  border-color: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.418);
  text-align: center;
  margin-top: 80px;
  border-radius: 10px;
  margin-left: 60px;
}
#text4{
  margin-top: -20px;
  font-size: 50px;
  font-family: cursive;
}
#img4{ 
  width: 120px;
  margin-top: 5px;
}
#usuarios{
  background-color: rgb(255, 255, 255);
  width: 170px;
  height: 40px;
 
  font-size: 20px;
  margin-top: -20px;
  font-family: cursive;
  text-align: center;
  border-radius: 10px;
}
#usuarios:hover{
  transform: scale(1.1);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.626);
}
/*CONDUCTORES */
.card9{
  width: 350px;
  height: 250px;
  background-color: #ffffff;
  border-color: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.418);
  text-align: center;
  margin-top: -260px;
  border-radius: 10px;
  margin-left: 1050px;
}
#conductor{
  background-color: rgb(255, 255, 255);
  width: 170px;
  height: 40px;
  color: white;
  font-size: 20px;
  margin-top: -20px;
  font-family: cursive;
  text-align: center;
  border-radius: 10px;
}
#conductor:hover{
  transform: scale(1.1);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.626);
}
#img5{
  width: 120px;
  margin-top: 5px;
}
#text8{
  margin-top: -20px;
  font-size: 50px;
  font-family: cursive;
}
/*TICKTETS */
.card10{
  width: 350px;
  height: 250px;
  background-color: #ffffff;
  border-color: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.418);;
  text-align: center;
  margin-top: -240px;
  border-radius: 10px;
  margin-left: 550px;
}
#ticket{
  background-color: rgb(255, 255, 255);
  width: 170px;
  height: 40px;
  color: white;
  font-size: 20px;
  margin-top: -20px;
  font-family: cursive;
  text-align: center;
  border-radius: 10px;
}
#ticket:hover{
  transform: scale(1.1);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.626);
}
/*card container */
.card-container {
  margin-top: 60px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;  
}
/* boton  */
.card11{ 
    width: 100px;
    height: 100px;
    margin-left: 680px;

    display: flex;
  }
.btn11{
    background-color: rgb(255, 255, 255);
  width: 100px;
  height: 40px;
  color: white;
  font-size: 20px;
  margin-top: 40px;
  font-family: cursive;
  text-align: center;
  border-radius: 5px;
  }
.btn11:hover{
    transform: scale(1.1);
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.626);
  }
  #img52{
    height: 20px;
  margin-left: -10px;
  margin-top: -5px;
  }
  .custom-link {
  text-decoration: none; /* Eliminar subrayado */
  color: black;
}
</style>
  