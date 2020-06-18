import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index'
import firebase from 'firebase'
import {db} from '../main'



Vue.use(Vuex)

export default new Vuex.Store({
  state: {

      correo:'',
      clave:'',
      visible:true,
      datos:null,
      usuarioID:''

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
        
        
        //localStorage.setItem=user.uid
        

    },

/*     traerUser(state){
        firebase.auth().onAuthStateChanged(function(user){
          if(user){
            console.log(user.id)
           state.usuarioID=user.uid
          }
      })
    }, */
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
      
/*       firebase.auth().onAuthStateChanged(function(user){
        if(user){
         state.usuarioID=user.uid */
         state.datos.find(element=>{
          if(valor==element.recipe.uri){
            let receta ={
              nombre: element.recipe.label,
              ingredientes: element.recipe.ingredientLines,
              imagen: element.recipe.image,
              uri: element.recipe.uri
            }
            db.collection(state.usuarioID).doc(receta.nombre).set(receta)
          /* }
        }) */

        }else{
          console.error("No hay usuario")
        }
      })
        

    } 

    
  },
  actions: {

    
    recibiendoInfo(context,info){
      context.commit('mutandoInfo',info)
    },

    enviarFavorito(context,info){
      context.commit('escribiendoFav',info)
    }

  }
})