import { defineAsyncComponent } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { Routes } from './common'

const AsyncPolicyPage = defineAsyncComponent(() => import('@/pages/PolicyPage.vue'))
const AsyncAuthPage = defineAsyncComponent(() => import('@/pages/AuthPage.vue'))
const AsyncHomePage = defineAsyncComponent(() => import('@/pages/HomePage.vue'))

export const routes: readonly RouteRecordRaw[] = [
  { path: Routes.HOME_PAGE, component: AsyncHomePage },
  { path: Routes.REGISTER_PAGE, component: AsyncAuthPage },
  { path: Routes.POLICY_PAGE, component: AsyncPolicyPage }
]
