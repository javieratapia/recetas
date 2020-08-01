  <template>
    <div>
      <!--HEADER-->
      <div>
        <b-jumbotron class="jumbo" header="Perfil">
          <h3>Aquí están tus datos de Chef</h3>
        </b-jumbotron>
      </div>
      <!--PERFIL USUARIO-->
      <b-form class="mt-4 container" v-if="show">
        <b-form-group id="input-group-1" label="Nombre:" label-for="input-1">
          <b-form-input id="input-1" v-model='traePerfil[1]' type="text" required></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-1" label="Correo Electrónico:" label-for="input-1">
          <b-form-input id="input-1" v-model="traePerfil[0]" type="email" required></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="¿Qué prefieres?" label-for="input-2">
            <b-form-select v-model="traePerfil[2]" :options="options"></b-form-select>
        </b-form-group>

        <b-button type="submit" variant="danger" @click.prevent='actualizar(traePerfil)'>Actualizar</b-button>
      </b-form>
      <!--FOOTER-->
      <PieFixed />
    </div>
</template>


<script>
import store from '../store/index'
import PieFixed from '../components/PieFixed'
import Swal from 'sweetalert2'
  export default {
    name:'Perfil',
    data() {
      return {
        correo:'',
        clave:'',
        nombre:'',
        preferencia:'',
        show: true,
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
        PieFixed
      },
    computed: {
       traePerfil(){
         return store.getters.infoPerfil
       }
    },//fin computed
    methods:{
      actualizar(element){   
        const expReg= /\w+@\w+\.+[a-z]/
        if(!expReg.test(this.traePerfil[0])){
            Swal.fire({
              icon: 'error',
              title: 'Error en correo',
              text: 'Ingresa un correo electrónico válido',
              confirmButtonColor:'#dc3545'
            })
          }else{
            store.dispatch('enviarActualizacion',element)
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
  background-image: url("../assets/img/ingredientes.jpg");
  background-size:cover;
  background-position: center;
  color:white;
}

</style>