  <template>
    <div>
      <!--HEADER-->
      <div>
        <b-jumbotron class="jumbo" header="Registrate">
        </b-jumbotron>
      </div>
      <!--FORMULARIO DE REGISTRO-->      
      <b-form class="my-5 container" v-if="show">
        <b-form-group id="input-group-1" label="Nombre:" label-for="input-1">
          <b-form-input id="input-1" v-model="nombre" type="text" required></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-1" label="Correo Electrónico:" label-for="input-1">
          <b-form-input id="input-1" v-model="correo" type="email" required></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Contraseña" label-for="input-2">
          <b-form-input id="input-2" v-model="clave" required type="password"></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Repite Contraseña" label-for="input-2">
          <b-form-input id="input-2" v-model="repiteClave" required type="password"></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="¿Qué prefieres?" label-for="input-2">
            <b-form-select v-model="preferencia" :options="options"></b-form-select>
        </b-form-group>

        <b-button type="submit" variant="danger" @click.prevent='registro'>Entrar</b-button>
      </b-form>
      <!--FOOTER-->
      <Pie />
    </div>
</template>


<script>
import Swal from 'sweetalert2'
import Pie from '../components/Pie'
  export default {
    data() {
      return {
        correo:'',
        clave:'',
        nombre:'',
        preferencia:'',
        show: true,
        repiteClave:'',
        options: [
          { value: 'meat', text: 'Carnes' },
          { value: 'fish', text: 'Pescados' },
          { value: 'vegetables', text: 'Vegetales' },
          { value: 'desert', text: 'Postres' },
          { value: 'sandwich', text: 'Sandwich'}, 
          { value: 'drinks', text: 'Bebidas'},
          { value: 'chocolate', text: 'Chocolate'}
        
        ]
        }  
      },
    components:{
      Pie
    },
    methods: {
        registro(){
          const expReg= /\w+@\w+\.+[a-z]/
          if (!this.correo || !this.clave || !this.repiteClave|| !this.preferencia || !this.nombre){
            Swal.fire({
              icon: 'error',
              title: 'Faltan Datos',
              text: 'Rellena todos los campos para registrarte',
              confirmButtonColor:'#dc3545'
            })
          }else if(!expReg.test(this.correo)){
            Swal.fire({
              icon: 'error',
              title: 'Error en correo',
              text: 'Ingresa un correo electrónico válido',
              confirmButtonColor:'#dc3545'
            })
          }
          else if (this.clave.length<6){
            Swal.fire({
            icon: 'error',
            title: 'Contraseña Incorrecta',
            text: 'Debe tener como mínimo 6 caracteres',
            confirmButtonColor:'#dc3545'
          })
          }else if(this.clave!=this.repiteClave){
            Swal.fire({
              icon: 'error',
              title: 'Contraseña No Coincide',
              text: 'Claves deben ser iguales',
              confirmButtonColor:'#dc3545'
            })
          }else{
            let user=[this.correo,this.clave,this.nombre,this.preferencia]
            this.$store.commit('registroUsuario',user)

          }
      }
    }//fin methods
  }
</script>

<style scoped lang="scss">
.form-control{
  display: inline-block!important;
  width: 35%!important;
  } 
.custom-select{
    width: 35%!important;
}
.jumbo {
  background-image: url("../assets/img/plato.jpg");
  background-size:cover;
  color:white;
}

</style>