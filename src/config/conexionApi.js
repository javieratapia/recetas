import {user,key} from './accesoApi'
import axios from 'axios'
import store from '../store/index'


export function conexionApi() {
    if(store.state.busqueda!=''){
    axios.get(`https://api.edamam.com/search?q=${store.state.busqueda}&app_id=${user}&app_key=${key}`)
    .then(response=>{
        store.dispatch('recibiendoInfo',response.data.hits)
    }).catch(error=>{
        console.error(error)
    })
    }else if(store.state.preferencia!='')
    {   console.log(store.state.preferencia)
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