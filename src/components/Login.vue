<template>
  <div class="card-container-login">
    <div class="card" id="login">
      
        
        <div class="card" id="card2">
          <img src="../img/admin.jpg" alt="" class="img-2" id="imagen">
          <h1 class="h1">Nombre</h1>
          <input type="text" v-model="username" id="nombre">
          <h1 class="h1">Contraseña</h1>
          <input type="password" v-model="password" id="contrasena">
         <button class="btn" ><router-link to="/admin" class="custom-link" id="boton1">iniciar</router-link></button>
        </div>
      </div>  
     
    </div>

</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useUserStore } from "../stores/user.js";
import { useRouter } from "vue-router";
import {useUsuarioStore} from "../stores/usuario.js"

const userStore = useUserStore();
const pasarMayuscula = computed(() => userStore.userData.toUpperCase());
const router = useRouter();


const username = ref("vendedor");
const password = ref("123");


let UsuarioStore  =  useUsuarioStore()


</script>

<style scoped>

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 50px;
}
.card-container-login {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top:10px;
}
#login {
  width: 800px;
  height: 600px;
  margin: 10px;
  padding: 10px;
  background-color: #ffffff;
  border-color: white;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.card {
  width: 400px;
  height: 500px;
  margin: 10px;
  padding: 10px;
  
  border-radius: 15px;

  border-color: rgba(0, 0, 0, 0.262);
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
#card2{
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.537);
}
.btn {
  background-color: #ffffff;
  border-color: black;
  width: 100px;
  height: 40px;
  color: rgb(159, 16, 16);
  font-size: 20px;
  margin-top: 20px;
  font-family: cursive;
  text-align: center;
  
  
}
.btn:hover {
  transform: scale(1.1);
  background-color: rgb(255, 255, 255);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.626);
}
.custom-link {
  text-decoration: none; /* Eliminar subrayado */
  color: black;
}
.h1 {
  font-size: 50px;
  font-family: cursive;
}

#nombre {
  width: 180px;
  height: 40px;
  font-size: 30px;
  border-radius: 9px;
}

#contrasena {
  width: 180px;
  height: 40px;
  font-size: 30px;
  border-radius: 9px;
}


.img-2 {
  height: 170px;
  border-radius: 80px;
}




</style>
