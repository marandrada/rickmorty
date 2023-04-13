import { createRouter, createWebHistory } from 'vue-router'
import CharacterListView from '../views/CharacterListView.vue'
import CharacterDetailView from '../views/CharacterDetailView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import { useUser } from '@/stores/useUser'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: CharacterListView,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/detail',
      name: 'detail',
      component: CharacterDetailView,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        requireAuth: false
      },
      component: () => import('../views/AuthView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: NotFoundView
    }
  ]
})

router.beforeEach((to, from, next) => {
  const store = useUser()
  const isAuth = store.token

  if (to.name == 'login' && isAuth) {
    next({ name: 'home' })
  } else if (to.meta.requireAuth && (isAuth == null)) {
    next({ name: 'login' })
  } else {
    next()
  }
})
export default router
