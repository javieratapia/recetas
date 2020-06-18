import {user,key} from './accesoApi'
import axios from 'axios'
import store from '../store/index'

export function conexionApi() {
    axios.get(`https://api.edamam.com/search?q=tomato&app_id=${user}&app_key=${key}`)
    .then(response=>{
        store.dispatch('recibiendoInfo',response.data.hits)
    }).catch(error=>{
        console.error(error)
    }
    )
}