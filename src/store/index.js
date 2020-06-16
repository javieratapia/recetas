import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index'
import {user,key} from '../config/accesoApi'


Vue.use(Vuex)
import firebase from 'firebase'
export default new Vuex.Store({
  state: {

      correo:'',
      clave:'',
      visible:true,
      busqueda:'tomato',
      datos:[]
      // {nombre:'',
      // ingredientes:[],
      // imagen:''}

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
    },
    traerRecetas(state,busqueda){
      fetch(`https://api.edamam.com/search?q=${busqueda}&app_id=${user}&app_key=${key}`).then(res=>{
        return res.json()
      }).then(data=>{
        let aux=[]
        let info=data.hits
        console.log("info")
        console.log(info)
        info.forEach(element => {
          console.log(element)
         aux.push({     
            nombre:element.recipe.label,
            ingredientes:element.recipe.ingredientLines,
            imagen:element.recipe.image
            
             })
            
           //this.state.datos.push(receta)
        });
        console.log(aux)
        state.datos=aux
        console.log(state.datos)
      })
    }
    
  },
  actions: {
    ejecutar:({commit})=>{
      commit('traerRecetas')
    }


  },

})
