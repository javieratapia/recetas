<template>
  <div>

<!--HEADER JUMBOTRON BIENVENIDA A LA PAG-->
    <div>
      <b-jumbotron header="El Recetario Maestro" lead="¿Te gusta cocinar? Prepara algo diferente cada día">
        <p>Ingresa para guardar tus platos favoritos</p>
        <router-link to="/login"><b-button variant="danger">Login</b-button></router-link>
      </b-jumbotron>
    </div>

<!--BODY-->
    <b-container class="bv-example-row" fluid>
          

  <!--PANEL DE BUSQUEDAS Y FILTROS-->
          <b-container class="my-5">
            <b-row align-h="center">
              <b-col cols="8">
                <b-input-group align-h="center">
                  <b-form-input size="sm" v-model="busqueda" class="mr-sm-2" placeholder="Search"></b-form-input>
                  <b-button size="sm" class="ml-2" variant="danger" @click.prevent="buscar()">Buscar</b-button>
                </b-input-group>
              </b-col>
            </b-row>
          </b-container>

  <!--DESPLIEGUE RECETAS CON CARD EN COLUMNAS-->  
        <b-container class="bv-example-row">
          <b-row align-h="center">
            <b-card-group deck v-for="(item,index) in recetas" :key="index">
            
              <b-card
                :img-src="item.recipe.image"
                no-body
                img-alt="Image"
                img-top
                tag="article"
                style="max-width: 20rem;"
                class="mb-2 mx-4"
                footer-bg-variant="white"
              >
              <template v-slot:header>
              <div v-if="item.recipe.label.length<=30">                
                  {{item.recipe.label}}                
              </div>

              <div v-else>
                  {{item.recipe.label.slice(0, 30)}}...                
              </div>
              </template>
              
              <template v-slot:footer>              
                <b-button href="#" variant="danger" v-b-modal="item.recipe.uri" class="mx-2">Ingredientes</b-button>
                <b-button href="#" variant="danger" @click="marcar(item.recipe.label)" class="mx-2">Favorito</b-button>
              </template>          
              </b-card>
                <!--MODAL CONTENEDOR RECETA-->
            <b-modal :title="item.recipe.label" :id="item.recipe.uri" >
              <p class="my-4" v-for="(variable,index) in item.recipe.ingredientLines" :key="index">{{variable}}</p>
              <b-button class="mt-3" variant="outline-danger" target="_blank" block :href="item.recipe.url">Receta Original</b-button>
            </b-modal>          
          </b-card-group>
          </b-row>
          </b-container>
          

      
      
      
    </b-container>

  </div>
</template>

<script>
import {conexionApi} from '../config/conexionApi.js'
import store from '../store/index'
import Swal from 'sweetalert2'

export default {
  name: 'Home',
  data(){
    return{
      busqueda:''
    }
  },
  mounted() {
    conexionApi()
   },
  computed: {
    recetas(){
      return store.getters.listaRecetas
    },

  },
  methods: {

    marcar(element){
      if (store.state.usuarioID!=''){
       return store.dispatch('enviarFavorito',element)
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Logueate',
          text: 'Debes tener una cuenta para guardar favoritos',
          confirmButtonColor:'#dc3545'
        })
      }
    },
    buscar(){
      if(this.busqueda!=''){
        store.dispatch('iniciaBuscador',this.busqueda)
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
.card-img-top{
  height: 315px;
  object-fit: cover;

}
</style>
