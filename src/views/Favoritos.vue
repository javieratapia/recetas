<template>
    <div class="mt-5 ">

    <b-container class="bv-example-row" fluid>
        <b-row align-h="center">  

<!--           <b-col cols="2" class="text-left">
            <b-nav-form>
              <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
              <b-button size="sm" class="my-2 my-sm-0" type="submit">...</b-button>
            </b-nav-form>
          </b-col>

        <b-col> -->
          <b-row cols="1" cols-sm="2" cols-md="2" cols-lg="3" align-h="center"> 
            <b-col v-for="(item,index) in listaFav" :key="index">
              <b-card
                :title="item.nombre"
                :img-src="item.imagen"
                img-alt="Image"
                img-top
                tag="article"
                style="max-width: 20rem;"
                class="mb-2">

                <!-- <b-button href="#" :variant="color" @click="marcar(item.recipe.uri)">{{index}}</b-button> -->
                <b-button href="#" variant="danger" v-b-modal="item.nombre" >Ver Ingredientes</b-button>
              </b-card>
                <!--MODAL CONTENEDOR RECETA-->
            <b-modal :title="item.nombre" :id="item.nombre" >
              <p class="my-4" v-for="(variable,index) in item.ingredientes" :key="index">{{variable}}</p>
            </b-modal> 
         
            </b-col>

            
      </b-row>
      <!-- </b-col> -->
      </b-row>
    </b-container>
    </div>
</template>

<script>

import {db} from '../main'
import store from '../store/index'
    export default {
        name: 'Favoritos',
        data(){
          return{
            listaFav:[]
          }
        },
        
        mounted() {
          
          db.collection(store.getters.traeUsuario).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {

        let aux={
                nombre:doc.data().nombre,
                imagen: doc.data().imagen,
                ingredientes: doc.data().ingredientes
              }
              this.listaFav.push(aux)
            
        })
    });
              
        
    }
    }
</script>

<style lang="scss" scoped>
.mt-5{
  margin-top: 6rem!important;
}
</style>