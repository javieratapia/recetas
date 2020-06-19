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
          
            <b-nav-form class="mx-auto">
              <b-form-input size="sm" v-model="busqueda" class="mr-sm-2" placeholder="Search"></b-form-input>
              <b-button size="sm" class="my-2 my-sm-0" @click.prevent="buscar()">...</b-button>
            </b-nav-form>
          

  <!--DESPLIEGUE RECETAS CON CARD EN COLUMNAS-->  
        <b-container class="bv-example-row">
          <b-row align-h="center">
            <b-card-group deck v-for="(item,index) in recetas" :key="index">
            
              <b-card
                :title="item.recipe.label"
                :img-src="item.recipe.image"
                img-alt="Image"
                img-top
                tag="article"
                style="max-width: 20rem;"
                class="mb-2 mx-4"
              >

                <b-button href="#" variant="danger" v-b-modal="item.recipe.uri" class="mx-2">Ingredientes</b-button>
                <b-button href="#" variant="danger" @click="marcar(item.recipe.label)" class="mx-2">Favorito</b-button>
                
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

import store from '../store/index'
export default {
  name: 'Home',
  data(){
    return{
      busqueda:''
    }
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
       alert('Ingresa para agregar favoritos')
      }
    },
    buscar(){
      if(this.busqueda!=''){
        store.dispatch('iniciaBuscador',this.busqueda)
      }else{
        alert('Ingresa una palabra para buscar')
      }
    }
  }
}
</script>
