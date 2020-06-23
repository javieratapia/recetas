<template>
  <div>

    <b-navbar toggleable="lg" type="dark" variant="danger" fixed="top">
      
      <b-navbar-brand href="#">
        <img src="../assets/img/gorritob.png" alt="" class="logo">
        El Recetario Maestro</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
        <b-navbar-nav>
          <router-link to="/" class="routerLink nav-link">Home</router-link>
        </b-navbar-nav>

      <!-- SI NO ESTÁ LOGUEADO -->
        <b-navbar-nav v-if=this.$store.state.visible>
          <router-link to="/Registro" class="routerLink nav-link">Regístrate</router-link>
        </b-navbar-nav>

        <b-navbar-nav v-if=this.$store.state.visible>
          <router-link to="/login" class="routerLink nav-link">Login</router-link>
        </b-navbar-nav>

        <b-navbar-nav v-if=!this.$store.state.visible>
          <router-link to="/favoritos" class="routerLink nav-link">Favoritos</router-link>
        </b-navbar-nav>

      <!-- SOLO SI EL USUARIO ESTÁ REGISTRADO -->
          <b-nav-item-dropdown right v-if=!this.$store.state.visible>

            <template v-slot:button-content>
              <em>Bienvenid@</em>
            </template>
            
            
            <router-link to="/perfil" class="routerLink dropdown-item">Perfil</router-link>
            <b-dropdown-item @click="logout">Desconectarse</b-dropdown-item>
          </b-nav-item-dropdown>


        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'Navegador',
  methods: {
    logout(){
      this.$store.commit('logout')
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.routerLink:hover{
  text-decoration: none;
}
.logo{
  width: 40px;
}


@import "./node_modules/bootstrap/scss/bootstrap.scss"
</style>
