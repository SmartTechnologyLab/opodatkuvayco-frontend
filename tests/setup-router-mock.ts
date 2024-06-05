import { VueRouterMock, createRouterMock, injectRouterMock } from 'vue-router-mock'
import { config } from '@vue/test-utils'
import { beforeEach, vi } from 'vitest'
import { createMemoryHistory } from 'vue-router'

export const router = createRouterMock({
  spy: {
    create: vi.fn,
    reset: vi.fn
  }
})
beforeEach(() => {
  router.reset()
  injectRouterMock(router)
})

config.plugins.VueWrapper.install(VueRouterMock)
