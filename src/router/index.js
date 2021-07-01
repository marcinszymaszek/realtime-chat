import { createRouter, createWebHistory } from 'vue-router'
import Chat from '../views/Chat.vue'
import GoogleLogin from "../views/GoogleLogin.vue";

const routes = [
  {
    path: '/',
    name: 'Chat',
    component: Chat
  },
  {
    path: '/google-login',
    name: 'GoogleLogin',
    component: GoogleLogin
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
