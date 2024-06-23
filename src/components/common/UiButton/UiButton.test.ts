import { RouterLinkStub, VueWrapper, shallowMount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import UiButton from '@/components/common/UiButton/UiButton.vue'
import { createRouterMock, injectRouterMock } from 'vue-router-mock'
import { Icons, Severities } from './constants'
import { stubComponent } from '@/helpers/testHelpers/createComponent'

const router = createRouterMock({
  spy: {
    create: vi.fn,
    reset: vi.fn
  }
})

const ButtonStub = stubComponent(UiButton, {
  template: '<button><slot /></button>'
})

describe('UiButton component', () => {
  let wrapper: VueWrapper<InstanceType<typeof UiButton>>

  const createComponent = (props?: any, attrs?: Record<string, unknown>) => {
    wrapper = shallowMount(UiButton, {
      props,
      attrs,
      slots: {
        default: 'Submit'
      },
      global: {
        stubs: {
          Button: ButtonStub,
          RouterLink: RouterLinkStub
        }
      }
    })
  }

  beforeEach(() => {
    injectRouterMock(router)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('renders without props', () => {
    createComponent()
    expect(wrapper.exists()).toBe(true)
  })

  it('renders with provided props', async () => {
    const CHECK_ICON = 'pi pi-check'
    const SEVERITY_DANGER = 'danger'

    type Props = {
      icon?: Icons
      severity?: Severities
      rounded?: boolean
      outlined?: boolean
      raised?: boolean
    }

    const buttonProps = {
      icon: CHECK_ICON,
      severity: SEVERITY_DANGER,
      rounded: true,
      outlined: true,
      raised: true
    } as Props

    createComponent(buttonProps)

    expect(wrapper.props().icon).toBe(buttonProps.icon)
    expect(wrapper.props().severity).toBe(buttonProps.severity)
    expect(wrapper.props().rounded).toBe(buttonProps.rounded)
    expect(wrapper.props().outlined).toBe(buttonProps.outlined)
    expect(wrapper.props().raised).toBe(buttonProps.raised)
  })

  it('emits click event when button get clicked', async () => {
    createComponent()

    await wrapper.trigger('click')

    expect(wrapper.emitted()).toHaveProperty('click')
  })

  it('passes value to defaul slot', () => {
    createComponent()

    expect(wrapper.text()).toContain('Submit')
  })

  const TEST_ROUTE = '/home'
  it('have parent element of router link if it has to attribute', async () => {
    createComponent(null, {
      to: '/'
    })

    await wrapper.trigger('click')

    await wrapper.router.push(TEST_ROUTE)

    expect(wrapper.findComponent({ name: 'RouterLink' })).toBeDefined()
    expect(wrapper.router.currentRoute.value.path).toEqual(TEST_ROUTE)
  })

  it('have not attribute class on element router link', async () => {
    createComponent()
    const CLASS_BTN = 'submit-btn'

    wrapper = shallowMount(UiButton, {
      attrs: {
        to: TEST_ROUTE,
        class: CLASS_BTN
      }
    })

    expect(wrapper.findComponent({ name: 'RouterLink' }).attributes().class).toBeUndefined()
  })

  const HREF_TEST = '#about'
  it('have parent element of anchor if it has href attribute', async () => {
    createComponent()
    wrapper = shallowMount(UiButton, {
      attrs: {
        href: HREF_TEST
      }
    })

    expect(wrapper.find('a').attributes().href).toEqual(HREF_TEST)
  })

  it('have not attribute class on element a', async () => {
    createComponent()
    const CLASS_BTN = 'submit-btn'

    wrapper = shallowMount(UiButton, {
      attrs: {
        href: HREF_TEST,
        class: CLASS_BTN
      }
    })

    expect(wrapper.find('a').attributes().class).toBeUndefined()
    expect(wrapper.findComponent({ name: 'Button' }).attributes().class).toEqual(CLASS_BTN)
  })
})
