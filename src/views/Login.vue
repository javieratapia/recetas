    <template>
  <div>
    <b-form class="mt-5 container" v-if="show">
      <b-form-group
        id="input-group-1"
        label="Correo Electrónico:"
        label-for="input-1"
        
      >
        <b-form-input
          id="input-1"
          v-model="correo"
          type="email"
          required
         
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Contraseña" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="clave"
          required
         
          type="password"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="danger" @click.prevent='loginUser'>Entrar</b-button>
    </b-form>
  </div>
</template>

<script>
//import firebase from 'firebase'
  export default {
    data() {
      return {
       // datos:{
          correo:'',
          clave:'',
         // },
        show: true,
        }  
      },
    
    methods: {

        loginUser(){
          let user=[this.correo,this.clave]
          this.$store.commit('login',user)
    //   firebase.auth().signInWithEmailAndPassword(this.correo,this.clave).then(()=>{
    //     this.$router.push('/favoritos')
    //   }).catch(err=>{
    //     console.log(err)
    //   })
     }
      }
    
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

</style>