import { createRouter, createWebHistory } from 'vue-router'
import { i18n } from '@/i18n'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/tasks' },
    {
      path: '/tasks',
      name: 'tasks',
      component: () => import('@/views/TasksView.vue'),
      meta: { titleKey: 'routeTitles.tasks' },
    },
    {
      path: '/journal',
      name: 'journal',
      component: () => import('@/views/JournalView.vue'),
      meta: { titleKey: 'routeTitles.journal' },
    },
    { path: '/:pathMatch(.*)*', redirect: '/tasks' },
  ],
})

router.afterEach((to) => {
  const titleKey = to.meta.titleKey as string | undefined
  if (titleKey) {
    document.title = i18n.global.t(titleKey)
  }
})

export default router
