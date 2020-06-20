import {user,key} from './accesoApi'
import axios from 'axios'
import store from '../store/index'
import Swal from 'sweetalert2'


export function conexionApi() {
    if(store.state.busqueda!=''){
       
    axios.get(`https://api.edamam.com/search?q=${store.state.busqueda}&app_id=${user}&app_key=${key}`)
    .then(response=>{
        if(response.data.count!=0){
            store.dispatch('recibiendoInfo',response.data.hits)
        }else{
            Swal.fire({
                icon: 'error',
                title: 'No encontramos recetas',
                text: 'Ingresa otra busqueda',
                confirmButtonColor:'#dc3545'
            })
        }
    }).catch(error=>{
        console.error(error)
    })
    }else if(store.state.preferencia!='')
    {   
        axios.get(`https://api.edamam.com/search?q=${store.state.preferencia}&app_id=${user}&app_key=${key}`)
        .then(response=>{
            store.dispatch('recibiendoInfo',response.data.hits)
        }).catch(error=>{
            console.error(error)
    })
    }
     else{axios.get(`https://api.edamam.com/search?q=tomato&app_id=${user}&app_key=${key}`)
     
    .then(response=>{
        store.dispatch('recibiendoInfo',response.data.hits)
    }).catch(error=>{
        console.error(error)
    }
    )

    } 
}