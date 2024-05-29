import { useUser } from '@/stores/user'
import type { Router } from 'vue-router'

export const guard = (router: Router) => {
  router.beforeEach(async (to) => {
    const userStore = useUser()

    await userStore.fetchUser()

    if (to.meta.requiresAuth && !userStore.isAuth) return '/login'
  })
}
