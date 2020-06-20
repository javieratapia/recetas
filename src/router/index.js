import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

Vue.use(VueRouter)

  const routes = [
    
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    alias: ['/ingresa', '/logueate', '/ingresar']
  },
  {
    path: '/favoritos',
    name: 'Favoritos',
    component: () => import('../views/Favoritos.vue'),
    meta:{requiredAuth:true}
  },
  { path: '/fav', redirect: '/favoritos' },
  { path: '/favorito', redirect: '/favoritos' },
  {
    path: '/perfil',
    name: 'Perfil',
    component: () => import('../views/Perfil.vue'),
    meta:{requiredAuth:true}
  },
  {
    path: '/registro',
    name: 'Registro',
    component: () => import('../views/Registro.vue')
  },
  { path: '/registrate', redirect: '/registro' },
  { path: '/registrar', redirect: '/registro' },
  {
    path: '*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to,from,next)=>{
  let loginReq=to.matched.some(url=>url.meta.requiredAuth)

  if(loginReq && !store.state.usuarioID){
    next('/login')
  }else{
    next()
  }
})

export default router
