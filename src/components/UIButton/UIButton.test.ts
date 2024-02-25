import { VueWrapper, shallowMount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import UIButton from './UIButton.vue'
import { Icons, Severities } from './constants'

describe('UIButton', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = shallowMount(UIButton)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('renders without props', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('renders with provided props', () => {
    const buttonProps = {
      icon: Icons.CHECK,
      severity: Severities.DANGER,
      rounded: true,
      outlined: true,
      raised: true
    }

    const wrapper = shallowMount(UIButton, {
      props: buttonProps
    })

    expect(wrapper.props('icon')).toBe(buttonProps.icon)
    expect(wrapper.props('severity')).toBe(buttonProps.severity)
    expect(wrapper.props('rounded')).toBe(buttonProps.rounded)
    expect(wrapper.props('outlined')).toBe(buttonProps.outlined)
    expect(wrapper.props('raised')).toBe(buttonProps.raised)
  })

  it('emits click event when button get clicked', async () => {
    await wrapper.trigger('click')

    expect(wrapper.emitted('click')).toBeTruthy()
  })
})
