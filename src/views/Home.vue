<template>
  <div>
<!--HEADER JUMBOTRON BIENVENIDA A LA PAG-->
    <div v-if=this.$store.state.visible>
      <b-jumbotron class="jumbo" header="El Recetario Maestro" lead="¿Te gusta cocinar? Prepara algo diferente cada día">
          <p>Ingresa para guardar tus platos favoritos</p>
          <router-link to="/login"><b-button variant="danger">Login</b-button></router-link>
      </b-jumbotron>
    </div>
    <div v-else>
      <b-jumbotron class="jumbo" header="El Recetario Maestro">
          <h2>Hola! {{this.$store.state.nombre}}</h2>
          <p>¿Estás listo para encontrar la receta perfecta?</p>
      </b-jumbotron>
    </div> 
<!--BODY-->
    <b-container class="bv-example-row" fluid>
  <!--PANEL DE BUSQUEDAS Y FILTROS-->
          <b-container class="my-5">
            <b-row align-h="center">
              <b-col cols="8">
                <b-input-group align-h="center">
                  <b-form-input size="sm" v-model="busqueda" class="mr-sm-2" placeholder="Buscar Receta (sólo en inglés)" @keyup.enter.prevent="buscar()"></b-form-input>
                  <b-button size="sm" class="ml-2" variant="danger" @click.prevent="buscar()" >Buscar</b-button>
                </b-input-group>
              </b-col>
            </b-row>
          </b-container>
  <!--DESPLIEGUE RECETAS CON CARD EN COLUMNAS-->  
        <b-container class="bv-example-row">
          <b-row align-h="center">
            <b-card-group deck v-for="(item,index) in recetas" :key="index">
              <card :imagen="item.recipe.image" :nombre="item.recipe.label" :uri="item.recipe.uri.substring(51,83)" :ingredientes="item.recipe.ingredientLines" :url="item.recipe.url" :fav="true"></card>
            </b-card-group>
          </b-row>
        </b-container>     
    </b-container>
    <!--AUTORIA API-->
    <b-container class="bv-example-row" fluid>
      <b-row align-h="end" class="mr-3">
          <a href="http://developer.edamam.com"  target="_blank" align-v="end"><img src="../assets/img/edamam_transparent.png" alt="" class="my-3"></a>
      </b-row>
    </b-container>
    <!--FOOTER-->
    <Pie />
  </div>
</template>
<script>

import store from '../store/index'
import Swal from 'sweetalert2'
import Card from '../components/Card'
import Pie from '../components/Pie'
export default {
  name: 'Home',
  data(){
    return{
      busqueda:''
    }
  },
  components:{
    Card,
    Pie
  },
  computed: {
    recetas(){
      return store.getters.listaRecetas
    },

  },
   methods: {
    buscar(){
      if(this.busqueda!=''){
        store.dispatch('iniciaBuscador',this.busqueda)
        this.busqueda=''
      }else{
        Swal.fire({
          icon: 'error',
          title: 'No hay nada aquí',
          text: 'Ingresa una palabra para buscar',
          confirmButtonColor:'#dc3545'
        })        
      }
    }
  } 
}
</script>
<style scoped lang="scss">

.jumbo {
  background-image: url("../assets/img/vegetales.jpg");
  background-position: center top;
  color:white;
}
</style>