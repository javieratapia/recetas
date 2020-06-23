<template>
    <div>
        <b-card
            :img-src="imagen" no-body img-alt="Image" img-top tag="article" style="max-width: 20rem;" class="mb-2 mx-4 my-3" footer-bg-variant="white">
            <template v-slot:header>
                <div v-if="nombre.length<=30">                
                    {{nombre}}                
                </div>
                <div v-else>
                    {{nombre.slice(0, 30)}}...                
                </div>
            </template>
                
            <template v-slot:footer>           
                <b-button href="#" variant="danger" v-b-modal="uri" class="mx-2">Ingredientes</b-button>
                <!--BOTON VISTA HOME-->                   
                <b-button v-if="fav" href="#" :variant="botonActivo?'outline-danger':'danger'" @click="marcar(uri)" :disabled="botonActivo" class="mx-2">{{botonActivo? 
                'Guardada':'Favoritos'}}</b-button>                

            <!--BOTON VISTA FAVORITOS -->
                <b-button v-else href="#" variant="danger" @click="desmarcar(uri)" class="mx-2">Quitar Favorito</b-button>
            </template>          
        </b-card>
        <!--MODAL CONTENEDOR RECETA-->
        <b-modal :title="nombre" :id="uri" okVariant= 'danger' okTitle= 'Listo' ok-only>
            <p class="my-4" v-for="(variable,index) in ingredientes" :key="index">{{variable}}</p>
            <b-row align-h="end"  class="my-3 mr-2">
                <a href="http://developer.edamam.com"  target="_blank"><img class="tamano" src="../assets/img/edamam_transparent.png" alt=""></a>
            </b-row>
            <b-button class="mt-3" variant="outline-danger" target="_blank" block :href="url">Receta Original</b-button>        
        </b-modal>     
    </div>
</template>

<script>
    import store from '../store/index'
    import Swal from 'sweetalert2'
    export default {
        props:{
            imagen:String,
            nombre: String,
            uri: String,
            ingredientes: Array,
            url:String,
            fav:Boolean,
        },
        data(){
            return{
            }
        },
        methods: {
            marcar(element){
                if (store.state.usuarioID!=''){
                    return store.dispatch('enviarFavorito',element)
                }else{
                    Swal.fire({
                    icon: 'error',
                    title: 'Logueate',
                    text: 'Debes tener una cuenta para guardar favoritos',
                    confirmButtonColor:'#dc3545'
                    })
                }
            },
            desmarcar(algo){
                Swal.fire({
                    title: 'Estás quitando un favorito',
                    text: "Tendrás que buscarlo nuevamente, cuando lo quieras volver a preparar",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#dc3545',
                    cancelButtonColor: '#dc3545',
                    confirmButtonText: 'Sí, bórrate'
                }).then((result) => {
                    if (result.value) {
                        store.state.listaFav.map((element,ind)=>{
                            if(element.uri==algo){
                                store.state.listaFav.splice(ind,1)
                                return store.dispatch('eliminarFavorito',algo)
                            }
                        })                        
                        Swal.fire({
                        title:'Eliminada',
                        text:'Has elimido la receta correctamente',
                        icon:'success',
                        confirmButtonColor: '#dc3545',
                        })            
                    }
                })
                
            }
        },//fin methods
        
        computed: {
            botonActivo(){
                if(store.state.usuarioID!=''){
                    return store.state.nombresFav.includes(this.uri)
                }else{
                    return false
                }                
            }
        },
    }
</script>

<style lang="scss" scoped>
.tamano{
    width: 100px;
}
</style>