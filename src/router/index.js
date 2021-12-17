import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import listarUsuario from '../components/ListarUsuario.vue'
import login from '../components/Login.vue'
import cambiarPassword from '../components/CambiarPassword.vue'
import recuperarPassword from '../components/RecuperarPassword.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/listarUsuario',
    name: 'listarUsuario',
    component: listarUsuario,
  },
  {
    path: '/login',
    name: 'login',
    component: login,
  },
  {
    path: '/cambiarPassword',
    name: 'cambiarPassword',
    component: cambiarPassword,
  },
  {
    path: '/recuperarPassword',
    name: 'recuperarPassword',
    component: recuperarPassword,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router