import AuthPage from '@/pages/AuthPage.vue'
import HomePage from '@/pages/HomePage.vue'
import PolicyPage from '@/pages/PolicyPage.vue'
import type { RouteRecordRaw } from 'vue-router'

export const routes: readonly RouteRecordRaw[] = [
  { path: '/', component: HomePage },
  { path: '/register', component: AuthPage },
  { path: '/policy', component: PolicyPage }
]
