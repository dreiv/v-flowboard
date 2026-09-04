import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/tasks' },
    {
      path: '/tasks',
      name: 'tasks',
      component: () => import('@/views/TasksView.vue'),
    },
    {
      path: '/journal',
      name: 'journal',
      component: () => import('@/views/JournalView.vue'),
    },
    { path: '/:pathMatch(.*)*', redirect: '/tasks' },
  ],
})

export default router
