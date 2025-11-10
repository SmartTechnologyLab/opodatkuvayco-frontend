import { defineAsyncComponent } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { Routes } from './common'
import HomePage from '@/pages/HomePage.vue'

const AsyncPolicyPage = defineAsyncComponent(() => import('@/pages/PolicyPage.vue'))
const AsyncTermsPage = defineAsyncComponent(() => import('@/pages/TermsPage.vue'))
const AsyncAuthPage = defineAsyncComponent(() => import('@/pages/AuthPage.vue'))
const AsyncAboutPage = defineAsyncComponent(() => import('@/pages/AboutPage.vue'))

export const routes: readonly RouteRecordRaw[] = [
  { path: Routes.HOME_PAGE, component: HomePage },
  { path: Routes.REGISTER_PAGE, component: AsyncAuthPage },
  { path: Routes.POLICY_PAGE, component: AsyncPolicyPage },
  { path: Routes.TERMS_PAGE, component: AsyncTermsPage },
  { path: Routes.ABOUT_PAGE, component: AsyncAboutPage }
]
