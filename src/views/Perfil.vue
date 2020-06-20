  <template>
    <div>
      <b-form class="mt-5 container" v-if="show">
        <h1 class="mb-4">Perfil</h1>

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
    </div>
</template>


<script>
import store from '../store/index'
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
    
    computed: {
       traePerfil(){
         return store.getters.infoPerfil
       }
    },//fin computed
    methods:{
      actualizar(element){        
          store.dispatch('enviarActualizacion',element)        
      }
    }//fin methods
  }
</script>

<style scoped lang="scss">
.mt-5{
  margin-top: 6rem!important;
}
.form-control{
  display: inline-block!important;
  width: 35%!important;
  } 
.custom-select{
    width: 35%!important;
}

</style>