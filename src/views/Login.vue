  <template>
    <div>
      <!--HEADER-->
      <div>
        <b-jumbotron class="jumbo" header="Login">
          <h3 class="negro">Ingresa a tu Cuenta</h3>
        </b-jumbotron>
      </div> 
      <!--FORMULARIO LOGIN-->     
      <b-form class="mt-5 container" v-if="show">
        <b-form-group id="input-group-1" label="Correo Electrónico:" label-for="input-1">
          <b-form-input id="input-1" v-model="correo" type="email" required></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Contraseña" label-for="input-2">
          <b-form-input id="input-2" v-model="clave" required type="password"></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="danger" class="mb-3" @click.prevent='loginUser'>Entrar</b-button>
      </b-form>

      <a @click.prevent="recuperar()" href="">Olvidé Contraseña</a>
      <!--FOOTER-->
      <PieFixed />
    </div>
</template>

<script>
import store from '../store/index'
import Swal from 'sweetalert2'
import PieFixed from '../components/PieFixed'
  export default {
    data() {
      return {
          correo:'',
          clave:'',
        show: true,
        }  
      },
    components:{
      PieFixed
    },
    methods: {
      loginUser(){
        let user=[this.correo,this.clave]
        store.commit('login',user)
      },

      recuperar(){
        if(this.correo!=''){
          store.dispatch('recuperaClave',this.correo)
        }else{
          Swal.fire({
          icon: 'error',
          title: 'Ingresa tu Correo',
          text: 'Ingresa un correo válido para restablecer tu contraseña',
          confirmButtonColor:'#dc3545'
          })
        }         
      }
    }
  }
</script>

<style scoped lang="scss">

.form-control{
  display: inline-block!important;
  width: 35%!important;
  }
a{
  color:#2c3e50
}
.jumbo {
  background-image: url("../assets/img/ingredientes.jpg");
  background-size:cover;
  color:white;
}

</style>