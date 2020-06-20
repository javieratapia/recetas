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
      clave:'',
      nombre:'',
      preferencia:'',
      visible:true,
      datos:null,
      usuarioID:'',
      busqueda:'',
      cambios: true
  },

  getters: {
    listaRecetas(state){
      return state.datos
    },

    traeUsuario(state){
      return state.usuarioID
    },

    infoPerfil(state){
      let perfil=[state.correo,state.nombre,state.preferencia]
      return perfil
    }
    
  },
  
  mutations: {
    login(state,valor){
      let email=valor[0]
      let password=valor[1]
      firebase.auth().signInWithEmailAndPassword(email,password).then((respuesta)=>{
        state.usuarioID=respuesta.user.uid
        state.correo=email
        state.clave=password
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
        db.collection(usuario).doc('datos').set(datos).then(()=>{
          Swal.fire({
            icon: 'success',
            title: 'Registro Exitoso',
            text: 'Ahora puedes loguearte para acceder',
            confirmButtonColor:'#dc3545'
          })
        }).then(()=>{
          router.push('/login')
        }) 
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
        db.collection(state.usuarioID).doc('favorito').collection('favorito').doc(receta.nombre).set(receta).then(()=>{
          Swal.fire({
            icon: 'success',
            title: 'Favorito Agregado',
            text: 'Ahora podrás encontrarlo en tu apartado favoritos',
            confirmButtonColor:'#dc3545'
          })
        })
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
    },

    actualizacion(state,valor){      
      if(valor[1]!=state.nombre||valor[2]!=state.preferencia||valor[0]!=state.correo){
        state.cambios=true
        let user=firebase.auth().currentUser
        let usuario=firebase.auth().currentUser.uid
        let refBD = db.collection(usuario).doc("datos")
        let credential=firebase.auth.EmailAuthProvider.credential(state.correo,state.clave)

        //ACTUALIZACIÓN EN DOCUMENTO BD 
        if(valor[1]!=state.nombre||valor[2]!=state.preferencia){
          refBD.update({
            nombre: valor[1],
            preferencia: valor[2]
            }).then(()=>{
              state.nombre=valor[1]
              state.preferencia=valor[2]
            }).catch(function() {
            state.cambios=false
            });
        }

          //ACTUALIZACIÓN EN AUTENTICACION
          user.reauthenticateWithCredential(credential).then(()=>{  
          if(valor[0]!=state.correo){
            user.updateEmail(valor[0]).then(function() {              
              //ACTUALIZACION CORREO EN BD
                refBD.update({
                  correo: valor[0]
                  }).then(()=>{
                    state.correo=valor[0]
                  })
                  .catch(function() {
                  state.cambios=false
                  })                  
          }).catch(function(error) {
            state.cambios=false
            state.correo=valor[0]
            if(error.code=='auth/email-already-in-use'){
              Swal.fire({
                icon: 'error',
                title: 'Correo Existente',
                text: 'El correo que ingresaste ya existe, prueba con otro',
                confirmButtonColor:'#dc3545'
              })
            }
          })
        }
      })
          setTimeout(()=>{
            if(state.cambios==true){
              Swal.fire({
                icon: 'success',
                title: 'Datos Actualizados',
                text: 'Tu prefil ha sido modificado correctamente',
                confirmButtonColor:'#dc3545'
              })
            }
          },2000)
        }
        else{
          Swal.fire({
            icon: 'warning',
            title: 'Datos Sin Cambio',
            text: 'No hay nada que actualizar',
            confirmButtonColor:'#dc3545'
          })
        }
    }, //fin actualización
    restablecer(state,valor){
      firebase.auth().sendPasswordResetEmail(valor).then(function() {
        Swal.fire({
          icon: 'success',
          title: 'Correo Enviado',
          text: 'Hemos enviado un correo para restablecer tu contraseña',
          confirmButtonColor:'#dc3545'
        })
      }).catch(function(error) {
        if(error.code=='auth/user-not-found'){
          Swal.fire({
            icon: 'error',
            title: 'Usuario No Encontrado',
            text: 'Ingresa un correo electrónico válido',
            confirmButtonColor:'#dc3545'
          })
        }
      });

    } 
  },//fin mutations

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

    enviarActualizacion(context,info){
      context.commit('actualizacion',info)
    },
    recuperaClave(context,info){
      context.commit('restablecer',info)
    }

  }

})