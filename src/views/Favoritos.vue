<template>
  <div class="mt-5 ">
    <h1 class="mb-4">Tu Recetario</h1>
    <b-container class="my-5">
      <b-row align-h="center">
        <b-col cols="8">
          <b-input-group align-h="center">
            <b-form-input size="sm" v-model="busquedafav" prepend="Buscar" class="mr-sm-2" placeholder="Escribe acá para buscar en tu Recetario"></b-form-input>
          </b-input-group>
        </b-col>
      </b-row>
    </b-container>
    <b-container class="bv-example-row">
      <b-row  align-h="center"> 
        <b-card-group deck v-for="(item,index) in traerFav" :key="index">
          <card :imagen="item.imagen" :nombre="item.nombre" :uri="item.nombre" :ingredientes="item.ingredientes" :url="item.url" :fav="false" ></card>                   
        </b-card-group>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import store from '../store/index';
import Card from '../components/Card'
    export default {
        name: 'Favoritos',
        components:{
          Card
        },
        data(){
          return{
            busquedafav:''
          }
        },
        computed:{
          traerFav(){
            return store.state.listaFav.filter((element)=>{
              return element.nombre.toLowerCase().includes(this.busquedafav)
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