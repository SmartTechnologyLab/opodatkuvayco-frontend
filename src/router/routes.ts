import { defineAsyncComponent } from 'vue'
import type { RouteRecordRaw } from 'vue-router'

const AsyncPolicyPage = defineAsyncComponent(() => import('@/pages/PolicyPage.vue'))
const AsyncAuthPage = defineAsyncComponent(() => import('@/pages/AuthPage.vue'))
const AsyncHomePage = defineAsyncComponent(() => import('@/pages/HomePage.vue'))

export enum Routes {
  HOME_PAGE = '/',
  REGISTER_PAGE = '/register',
  POLICY_PAGE = '/policy'
}

export const routes: readonly RouteRecordRaw[] = [
  { path: Routes.HOME_PAGE, component: AsyncHomePage },
  { path: Routes.REGISTER_PAGE, component: AsyncAuthPage },
  { path: Routes.POLICY_PAGE, component: AsyncPolicyPage }
]
