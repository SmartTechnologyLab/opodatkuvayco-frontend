import { shallowMount, type VueWrapper } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import TaxCalculator from '@/components/common/TaxCalculator/TaxCalculator.vue'
import FileInput from '@/components/common/FileInput/FileInput.vue'

describe('TaxCalculator tests', () => {
  let wrapper: VueWrapper
  beforeEach(() => {
    wrapper = shallowMount(TaxCalculator, {
      global: {
        stubs: {
          UIButton: {
            template: '<button @click="$emit(\'clickBtn\')"><slot /></button>'
          },
          FileInput
        }
      }
    })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('When result is null or isCalculating is false - render FileInput', () => {
    const fileInput = wrapper.find('[data-testid="file-input"]')
    const resultInput = wrapper.find('[data-testid="result"]')

    expect(fileInput.exists()).toBe(true)
    expect(resultInput.exists()).toBe(false)
  })

  it('When the button with number is clicked, the result input is mounted into DOM', async () => {
    const numberBtn = wrapper.findAll('[data-testid="btn-number"]').at(0)

    await numberBtn?.trigger('click')

    expect(wrapper.find('[data-testid="file-input"]').exists()).toBe(false)
    expect(wrapper.find('[data-testid="result"]').exists()).toBe(true)
  })

  it('When the reset button clicked, the result input is unmounted from DOM and the FileInput renders', async () => {
    const numberBtn = wrapper.findAll('[data-testid="btn-number"]').at(0)
    const resetBtn = wrapper.find('[data-testid="reset-btn"]')

    await numberBtn?.trigger('click')

    expect(wrapper.find('[data-testid="file-input"]').exists()).toBe(false)
    expect(wrapper.find('[data-testid="result"]').exists()).toBe(true)

    await resetBtn.trigger('click')

    expect(wrapper.find('[data-testid="file-input"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="result"]').exists()).toBe(false)
  })

  it('Calctulating the sum correctly', async () => {
    const equalBtn = wrapper.find('[data-testid="btn-equal"]')
    const plus = wrapper.findAll('[data-testid="btn-operation"]').find((btn) => btn.text() === '+')
    const one = wrapper.findAll('[data-testid="btn-number"]').at(0)
    const two = wrapper.findAll('[data-testid="btn-number"]').at(1)

    await one?.trigger('click')

    await plus?.trigger('click')

    await two?.trigger('click')

    await equalBtn.trigger('click')

    const resultInput = wrapper.find('[data-testid="result"]')
    expect((resultInput.element as HTMLInputElement).value).toEqual('3')
  })

  it('Calctulating the difference correctly', async () => {
    const equalBtn = wrapper.find('[data-testid="btn-equal"]')
    const minus = wrapper.findAll('[data-testid="btn-operation"]').find((btn) => btn.text() === '-')
    const one = wrapper.findAll('[data-testid="btn-number"]').at(0)
    const two = wrapper.findAll('[data-testid="btn-number"]').at(1)

    await one?.trigger('click')

    await minus?.trigger('click')

    await two?.trigger('click')

    await equalBtn.trigger('click')

    const resultInput = wrapper.find('[data-testid="result"]')
    expect((resultInput.element as HTMLInputElement).value).toEqual('-1')
  })

  it('Calctulating the multiplication correctly', async () => {
    const equalBtn = wrapper.find('[data-testid="btn-equal"]')
    const multi = wrapper.findAll('[data-testid="btn-operation"]').find((btn) => btn.text() === '*')
    const two = wrapper.findAll('[data-testid="btn-number"]').at(1)
    const three = wrapper.findAll('[data-testid="btn-number"]').at(2)

    await three?.trigger('click')

    await multi?.trigger('click')

    await two?.trigger('click')

    await equalBtn.trigger('click')

    const resultInput = wrapper.find('[data-testid="result"]')
    expect((resultInput.element as HTMLInputElement).value).toEqual('6')
  })

  it('Calctulating the division correctly', async () => {
    const equalBtn = wrapper.find('[data-testid="btn-equal"]')
    const division = wrapper.findAll('[data-testid="btn-operation"]').find((btn) => btn.text() === '/')
    const three = wrapper.findAll('[data-testid="btn-number"]').at(2)

    await three?.trigger('click')

    await division?.trigger('click')

    await three?.trigger('click')

    await equalBtn.trigger('click')

    const resultInput = wrapper.find('[data-testid="result"]')
    expect((resultInput.element as HTMLInputElement).value).toEqual('1')
  })

  it('Set the number to negative correctly', async () => {
    const equalBtn = wrapper.find('[data-testid="btn-equal"]')
    const plus = wrapper.findAll('[data-testid="btn-operation"]').find((btn) => btn.text() === '+')
    const negative = wrapper.findAll('[data-testid="btn-number"]').find((btn) => btn.text() === '+/-')
    const three = wrapper.findAll('[data-testid="btn-number"]').at(2)

    await three?.trigger('click')

    await plus?.trigger('click')

    await negative?.trigger('click')

    await three?.trigger('click')

    await equalBtn.trigger('click')

    const resultInput = wrapper.find('[data-testid="result"]')
    expect((resultInput.element as HTMLInputElement).value).toEqual('0')
  })

  it('Handles file input change', async () => {
    const fileInput = wrapper.findComponent(FileInput)

    const file = new File(['file'], 'example.json', { type: 'application/json' })
    const files = [file]

    fileInput.vm.$emit('onFileSelect', { target: { files } })

    await wrapper.vm.$nextTick()

    const fileItem = wrapper.find('[data-testid="file-name"]')
    expect(fileItem.exists()).toBe(true)
    expect(fileItem.text()).toContain('example.json')
  })

  it('Deletes file correctly', async () => {
    const fileInput = wrapper.findComponent(FileInput)

    const file = new File(['file'], 'example.json', { type: 'application/json' })
    const files = [file]

    fileInput.vm.$emit('onFileSelect', { target: { files } })

    await wrapper.vm.$nextTick()

    const deleteFile = wrapper.find('[data-testid="btn-deleteFile"]')

    await deleteFile.trigger('click')

    await wrapper.vm.$nextTick()

    const fileItem = wrapper.find('[data-testid="file-name"]')
    expect(fileItem.exists()).toBe(false)
  })
})
