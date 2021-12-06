import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import registroUsuario from '../components/RegistroUsuario.vue'
import listarUsuario from '../components/ListarUsuario.vue'
import login from '../components/Login.vue'
import cambiarPassword from '../components/CambiarPassword.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/registroUsuario',
    name: 'registroUsuario',
    component: registroUsuario,
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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router