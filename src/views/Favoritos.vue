<template>
  <div class="mt-5 ">
    <div>
      <b-jumbotron class="jumbo" header="Tu Libro de Recetas">
        <h3 class="negro">Aquí están tus seleccionados como favorito</h3>
      </b-jumbotron>
    </div>

    <b-container class="my-5">
      <b-row align-h="center">
        <b-col cols="8">
          <b-input-group align-h="center">
            <b-form-input size="sm" v-model="busquedafav" prepend="Buscar" class="mr-sm-2" placeholder="Escribe acá para buscar en tu Recetario (sólo en inglés)"></b-form-input>
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
.jumbo {
  background-image: url("../assets/img/libro-oscuro.jpg");
  background-position: center top;
  color:white;
}

</style>