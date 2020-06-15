import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index'


Vue.use(Vuex)
import firebase from 'firebase'
export default new Vuex.Store({
  state: {

      correo:'',
      clave:'',
      visible:true

  },
  getters: {

  },
  mutations: {
    login(state,valor){
      state.correo=valor[0]
      state.clave=valor[1]
      firebase.auth().signInWithEmailAndPassword(state.correo,state.clave).then(()=>{
        router.push('/favoritos')
        state.visible=false
           }).catch(err=>{
             console.log(err)
           })
    },
    logout(state){
      firebase.auth().signOut().then(()=>{
        state.correo=''
        state.clave=''   
        state.visible=true    
        router.push('/login')
      })
    }
  },
  actions: {


  },

})
