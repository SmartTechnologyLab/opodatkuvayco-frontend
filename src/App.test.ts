import { shallowMount, VueWrapper } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import App from '@/App.vue'
import { createRouterMock, injectRouterMock } from 'vue-router-mock'

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
})
