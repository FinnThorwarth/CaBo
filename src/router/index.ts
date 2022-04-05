import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
const HomePage = () => import('../views/pages/PageHome.vue')
const LoginPage = () => import('../views/pages/PageLogin.vue')
const RegisterPage = () => import('../views/pages/PageRegister.vue')
const CarPage = () => import('../views/pages/PageCars.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/cars',
    name: 'Autos',
    component: CarPage
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
