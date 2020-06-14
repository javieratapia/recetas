<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Navegador msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Navegador from '@/components/Navegador.vue'

export default {
  name: 'Home',
  components: {
    Navegador
  }
}
</script>
