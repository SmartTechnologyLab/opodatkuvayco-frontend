import { defineAsyncComponent } from 'vue'
import type { RouteRecordRaw } from 'vue-router'

const AsyncPolicyPage = defineAsyncComponent(() => import('@/pages/PolicyPage.vue'))
const AsyncAuthPage = defineAsyncComponent(() => import('@/pages/AuthPage.vue'))
const AsyncHomePage = defineAsyncComponent(() => import('@/pages/HomePage.vue'))

export const routes: readonly RouteRecordRaw[] = [
  { path: '/', component: AsyncHomePage },
  { path: '/register', component: AsyncAuthPage },
  { path: '/policy', component: AsyncPolicyPage }
]
