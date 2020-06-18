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
        <b-row>  

  <!--PANEL DE BUSQUEDAS Y FILTROS-->
          <b-col lg="2" cols="12"  class="text-left"  >
            <b-nav-form class="mx-auto">
              <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
              <b-button size="sm" class="my-2 my-sm-0" type="submit">...</b-button>
            </b-nav-form>
          </b-col>

  <!--DESPLIEGUE RECETAS CON CARD EN COLUMNAS-->  
        <b-col lg="10" cols="12" >
          <b-row cols="1" cols-sm="1" cols-md="2" cols-lg="3"> 
            <b-col v-for="(item,index) in recetas" :key="index">
              <b-card
                :title="item.recipe.label"
                :img-src="item.recipe.image"
                img-alt="Image"
                img-top
                tag="article"
                style="max-width: 20rem;"
                class="mb-2"
              >
<!--                 <b-card-text v-for="(variable,index) in item.recipe.ingredientLines" :key="index">
                  {{variable}}
                </b-card-text> -->
                <b-button href="#" variant="danger" v-b-modal="item.recipe.uri" class="mx-2">Ingredientes</b-button>
                <b-button href="#" :variant="color" @click="marcar(item.recipe.label)" class="mx-2">Favorito</b-button>
                
              </b-card>
                <!--MODAL CONTENEDOR RECETA-->
            <b-modal :title="item.recipe.label" :id="item.recipe.uri" >
              <p class="my-4" v-for="(variable,index) in item.recipe.ingredientLines" :key="index">{{variable}}</p>
            </b-modal> 
         
            </b-col>




           
      </b-row>
      </b-col>
      </b-row>
    </b-container>

  </div>
</template>

<script>

import store from '../store/index'
export default {
  name: 'Home',
  data(){
    return{
      fav:false,
      color:''
    }
  },
  computed: {
    recetas(){
      return store.getters.listaRecetas
    },

  },
  methods: {

    marcar(algo){
      if (store.state.usuarioID!=''){
       return store.dispatch('enviarFavorito',algo)
      }else{
       alert('Ingresa para agregar favoritos')
      }
    },
  }
}
</script>
