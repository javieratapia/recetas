<template>
    <div class="mt-5 ">

    <b-container class="bv-example-row">
          <b-row  align-h="center"> 
            <b-card-group deck v-for="(item,index) in listaFav" :key="index">
           
              <b-card
                :img-src="item.imagen"
                no-body
                img-alt="Image"
                img-top
                tag="article"
                style="max-width: 20rem"
                class="mb-2 mx-4"
                footer-bg-variant="white"
                >

              <template v-slot:header>
                <div v-if="item.nombre.length<=30">{{item.nombre}} </div>
                <div v-else>{{item.nombre.slice(0, 30)}}... </div>
              </template>
                
                <template v-slot:footer> 
                  <b-button href="#" variant="danger" v-b-modal="item.nombre" >Ingredientes</b-button>
                  <b-button href="#" variant="danger" @click="desmarcar(item.nombre)" class="mx-2">Quitar Favorito</b-button>
                </template>
              </b-card>
                <!--MODAL CONTENEDOR RECETA-->
            <b-modal :title="item.nombre" :id="item.nombre" >
              <p class="my-4" v-for="(variable,index) in item.ingredientes" :key="index">{{variable}}</p>
              <b-button class="mt-3" variant="outline-danger" target="_blank" block :href="item.url">Receta Original</b-button>
            </b-modal> 
         
            
  </b-card-group>
            
      

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
          db.collection(store.getters.traeUsuario).doc('favorito').collection('favorito').get().
          then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
            let aux={
                nombre:doc.data().nombre,
                imagen: doc.data().imagen,
                ingredientes: doc.data().ingredientes,
                url: doc.data().url
                }
              this.listaFav.push(aux)            
            })
          });       
        },

        methods:{
          desmarcar(algo){
            this.listaFav.map((element,ind)=>{
              if(element.nombre==algo){
                this.listaFav.splice(ind,1)
                return store.dispatch('eliminarFavorito',algo)
              }
            })
            
          }
        }
    }
</script>

<style lang="scss" scoped>
.mt-5{
  margin-top: 6rem!important;
}

</style>