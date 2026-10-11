import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    {
      path: '/blog',
      name: 'blog',
      component: () => import('../views/ComingSoonView.vue'),
      props: { title: '博客功能建设中', description: '文章与创作，将在这里相遇。' },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/ComingSoonView.vue'),
      props: { title: '登录功能暂未开放', description: 'PRIVATE LAB 正在准备中，注册暂未开放。' },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
