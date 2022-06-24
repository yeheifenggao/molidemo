import { createRouter, createWebHashHistory } from 'vue-router'
import Mainmenu from '@/views/Mainmenu.vue'
import Homeview from '@/views/Homeview.vue'
import test from '@/components/test.vue'
import ModelPresentation from '@/components/ModelPresentation.vue'
import Three from '@/components/Three.vue'

const routes = [
  {
    path:'/',
    component:Homeview
  },
  {
    path:'/model',
    component:Mainmenu
  },
  {
    path:'/test',
    component:test
  },
  {
    path:'/model1',
    component:ModelPresentation
  },
  {
    path:'/three',
    component:Three
  }
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
