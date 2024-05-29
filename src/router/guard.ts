import type { Router } from 'vue-router'
import { useSupabase } from 'vue-supabase'

export const guard = (router: Router) => {
  router.beforeEach(async (to) => {
    const { auth } = useSupabase()

    if (to.meta.requiresAuth && !auth.user()) return '/login'
  })
}
