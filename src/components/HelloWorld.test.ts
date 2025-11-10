import { shallowMount } from '@vue/test-utils'
import HelloWorld from './HelloWorld.vue'
import { describe, it, expect } from 'vitest'

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const wrapper = shallowMount(HelloWorld)

    expect(wrapper.text()).toMatch(
      'Hello2 долари0 доларів100 доларів10 000,00 USD10 000,00 EUR10 000,00 ₴8 лист. 2000 р.середа, 8 листопада 2000 р. о 00:00'
    )
  })
})
