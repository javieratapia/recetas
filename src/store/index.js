import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index'
import firebase from 'firebase'
import {db} from '../main'
import { conexionApi } from '../config/conexionApi'



Vue.use(Vuex)

export default new Vuex.Store({
  state: {

      correo:'',
      clave:'',
      visible:true,
      datos:null,
      usuarioID:'',
      busqueda:''

  },
  getters: {
    listaRecetas(state){
      return state.datos
    },
     traeUsuario(state){
      return state.usuarioID
    } 

  },
  
  mutations: {
    login(state,valor){
      state.correo=valor[0]
      state.clave=valor[1]
      firebase.auth().signInWithEmailAndPassword(state.correo,state.clave).then((respuesta)=>{

          console.log(respuesta.user.uid)
           state.usuarioID=respuesta.user.uid
           console.log(state.usuarioID)

          router.push('/favoritos')
          state.visible=false
             })          
             .catch(err=>{
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

    mutandoInfo(state,info){
      state.datos = info
       state.datos.forEach(element=>{
        element.fav=false
      }) 
    },

    escribiendoFav(state,valor){
      state.datos.find(element=>{
        if(valor==element.recipe.label){
          let receta ={
            nombre: element.recipe.label,
            ingredientes: element.recipe.ingredientLines,
            imagen: element.recipe.image,
            uri: element.recipe.uri,
            url: element.recipe.url
            }
        db.collection(state.usuarioID).doc(receta.nombre).set(receta)
          }
        })
      },

    eliminandoFav(state,valor){
      db.collection(state.usuarioID).doc(valor).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
    },

    buscador(state,valor){
      state.busqueda = valor
      conexionApi()
      console.log(state.busqueda)
    }

    
  },
  actions: {

    
    recibiendoInfo(context,info){
      context.commit('mutandoInfo',info)
    },

    enviarFavorito(context,info){
      context.commit('escribiendoFav',info)
    },
    eliminarFavorito(context,info){
      context.commit('eliminandoFav',info)
    },
    iniciaBuscador(context,info){
      context.commit('buscador',info)
    }

  }
})