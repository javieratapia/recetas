<template>
  <div id="app">
    <Navegador />

      <router-view/>

  </div>
</template>

<script>
import Navegador from '@/components/Navegador.vue'
import {conexionApi} from './config/conexionApi.js'

export default {
  components: {
    Navegador
  },
/*    data(){
    return{
      info:null,
      busqueda: 'tomato'
    }
  },*/
   mounted() {
     conexionApi()
   },  
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 3.5rem;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

</style>
