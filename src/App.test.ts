import { VueWrapper, shallowMount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import App from '@/App.vue'
import { createRouterMock, injectRouterMock } from 'vue-router-mock'
import { Routes } from './router/common'

describe('App.vue tests', () => {
  let wrapper: VueWrapper

  const router = createRouterMock({
    spy: {
      create: vi.fn,
      reset: vi.fn
    }
  })

  beforeEach(() => {
    injectRouterMock(router)
  })

  it('Router view is defined at template', () => {
    wrapper = shallowMount(App)

    const routerView = wrapper.findComponent({ name: 'RouterView' })

    expect(routerView.exists()).toBe(true)
  })

  it('Navbar not rendering with some routes', async () => {
    wrapper = shallowMount(App)

    await router.push(Routes.REGISTER_PAGE)

    expect(wrapper.findComponent({ name: 'NavBar' }).exists()).toBe(false)
  })

  it('Navbar renders with another routes', async () => {
    wrapper = shallowMount(App)

    await router.push(Routes.POLICY_PAGE)

    expect(wrapper.findComponent({ name: 'NavBar' }).exists()).toBe(true)
  })
})
