import { VueRouterMock, createRouterMock, injectRouterMock } from 'vue-router-mock'
import { config } from '@vue/test-utils'
import { beforeEach, vi } from 'vitest'

const router = createRouterMock({
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
