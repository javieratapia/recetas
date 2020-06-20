import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index'
import firebase from 'firebase'
import {db} from '../main'
import { conexionApi } from '../config/conexionApi'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      correo:'',
      nombre:'',
      preferencia:'',
      visible:true,
      datos:null,
      usuarioID:'',
      busqueda:'',
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
      let email=valor[0]
      let password=valor[1]
      firebase.auth().signInWithEmailAndPassword(email,password).then((respuesta)=>{
        state.usuarioID=respuesta.user.uid
        
        db.collection(state.usuarioID).get().then((querySnapshot)=>{
          querySnapshot.forEach((doc)=>{           
              state.nombre=doc.data().nombre
              state.preferencia=doc.data().preferencia                        
          })
        }).then(()=>{
          conexionApi()
          setTimeout((function(){ router.push('/') }), 1000)  
        })                      
        state.visible=false
      }).catch(error=>{
          if (error.code=='auth/user-not-found'){
            Swal.fire({
              icon: 'error',
              title: 'Usuario No Encontrado',
              text: 'Registrate para acceder',
              confirmButtonColor:'#dc3545'
            })
          }else if (error.code=='auth/invalid-email'){
            Swal.fire({
              icon: 'error',
              title: 'Error en Correo',
              text: 'Ingresa un correo válido',
              confirmButtonColor:'#dc3545'
            })
          }else if(error.code=='auth/wrong-password'){
            Swal.fire({
              icon: 'error',
              title: 'Error en Contraseña',
              text: 'Ingresa contraseña correcta',
              confirmButtonColor:'#dc3545'
            })
          }          
        })
    },

     registroUsuario(state,valor){
      let email=valor[0]
      let password=valor[1]
      let name=valor[2]
      let preference=valor[3]
      firebase.auth().createUserWithEmailAndPassword(email, password).then((respuesta)=>{
        let usuario=respuesta.user.uid
        let datos={
          nombre:name,
          correo:email,
          preferencia: preference
        }
        db.collection(usuario).doc('datos').set(datos) 
      }).catch(function(error) {
        if (error.code=='auth/email-already-exists'){
          Swal.fire({
            icon: 'error',
            title: 'Este correo ya existe',
            text: 'Logueate para acceder',
            confirmButtonColor:'#dc3545'
          })
        }
     
      });
    }, 

    logout(state){
      firebase.auth().signOut().then(()=>{
        state.correo=''
        state.nombre=''
        state.preferencia=''   
        state.visible=true
        state.usuarioID=''   
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
        db.collection(state.usuarioID).doc('favorito').collection('favorito').doc(receta.nombre).set(receta)
          }
        })
      },

    eliminandoFav(state,valor){
      db.collection(state.usuarioID).doc('favorito').collection('favorito').doc(valor).delete().then(function() {
      }).catch(function(error) {
        console.error(error);
      });
    },

    buscador(state,valor){
      state.busqueda = valor
      conexionApi()
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
    },

  }

})