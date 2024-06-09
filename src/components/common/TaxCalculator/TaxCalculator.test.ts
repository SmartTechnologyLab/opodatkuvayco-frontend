import { DOMWrapper, shallowMount, type VueWrapper } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import TaxCalculator from '@/components/common/TaxCalculator/TaxCalculator.vue'
import FileInput from '@/components/common/FileInput/FileInput.vue'
import { nextTick } from 'vue'

describe('TaxCalculator tests', () => {
  let wrapper: VueWrapper

  const findButtonByText = (text: string): DOMWrapper<HTMLElement> => {
    return wrapper.findAll('button').find((button) => button.text() === text) as DOMWrapper<HTMLElement>
  }

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
    const fileInput = wrapper.findComponent(FileInput)
    const resultInput = wrapper.find('[data-testid="result"]')

    expect(fileInput.exists()).toBe(true)
    expect(resultInput.exists()).toBe(false)
  })

  it('When the button with number is clicked, the result input is mounted into DOM', async () => {
    const numberBtn = findButtonByText('1')

    await numberBtn.trigger('click')

    expect(wrapper.findComponent(FileInput).exists()).toBe(false)
    expect(wrapper.find('input').exists()).toBe(true)
  })

  it('When the reset button clicked, the result input is unmounted from DOM and the FileInput renders', async () => {
    const numberBtn = findButtonByText('1')
    const resetBtn = findButtonByText('C')

    await numberBtn?.trigger('click')

    expect(wrapper.findComponent(FileInput).exists()).toBe(false)
    expect(wrapper.find('input').exists()).toBe(true)

    await resetBtn.trigger('click')

    const resultInput = wrapper.find('input').attributes().type === 'text'

    expect(wrapper.findComponent(FileInput).exists()).toBe(true)
    expect(resultInput).toBe(false)
  })

  it('Calctulating the sum correctly', async () => {
    const equalBtn = findButtonByText('=')
    const plusBtn = findButtonByText('+')
    const oneBtn = findButtonByText('1')
    const twoBtn = findButtonByText('2')

    await oneBtn.trigger('click')

    await plusBtn.trigger('click')

    await twoBtn.trigger('click')

    await equalBtn.trigger('click')

    const resultInput = wrapper.find('input')
    expect((resultInput.element as HTMLInputElement).value).toStrictEqual('3')
  })

  it('Calctulating the difference correctly', async () => {
    const equalBtn = findButtonByText('=')
    const minusBtn = findButtonByText('-')
    const oneBtn = findButtonByText('1')
    const twoBtn = findButtonByText('2')

    await oneBtn.trigger('click')

    await minusBtn.trigger('click')

    await twoBtn.trigger('click')

    await equalBtn.trigger('click')

    const resultInput = wrapper.find('input')
    expect((resultInput.element as HTMLInputElement).value).toStrictEqual('-1')
  })

  it('Calctulating the multiplication correctly', async () => {
    const equalBtn = findButtonByText('=')
    const multiplyBtn = findButtonByText('*')
    const twoBtn = findButtonByText('2')
    const threeBtn = findButtonByText('3')

    await threeBtn.trigger('click')

    await multiplyBtn.trigger('click')

    await twoBtn.trigger('click')

    await equalBtn.trigger('click')

    const resultInput = wrapper.find('input')
    expect((resultInput.element as HTMLInputElement).value).toStrictEqual('6')
  })

  it('Calctulating the division correctly', async () => {
    const equalBtn = findButtonByText('=')
    const divisionBtn = findButtonByText('/')
    const threeBtn = findButtonByText('3')

    await threeBtn.trigger('click')

    await divisionBtn.trigger('click')

    await threeBtn.trigger('click')

    await equalBtn.trigger('click')

    const resultInput = wrapper.find('input')
    expect((resultInput.element as HTMLInputElement).value).toEqual('1')
  })

  it('Set the number to negative correctly', async () => {
    const equalBtn = findButtonByText('=')
    const plusBtn = findButtonByText('+')
    const negativeBtn = findButtonByText('+/-')
    const threeBtn = findButtonByText('3')

    await threeBtn?.trigger('click')

    await plusBtn?.trigger('click')

    await negativeBtn?.trigger('click')

    await threeBtn?.trigger('click')

    await equalBtn.trigger('click')

    const resultInput = wrapper.find('input')
    expect((resultInput.element as HTMLInputElement).value).toEqual('0')
  })

  it('Handles file input change', async () => {
    const fileInput = wrapper.findComponent(FileInput)

    const file = new File(['file'], 'example.json', { type: 'application/json' })
    const files = [file]

    fileInput.vm.$emit('change', { target: { files } })

    await nextTick()

    const fileItem = wrapper.findAll('span').find((span) => span.text() === file.name) as DOMWrapper<HTMLSpanElement>
    expect(fileItem.exists()).toBe(true)
    expect(fileItem.text()).toContain('example.json')
  })

  it('Deletes file correctly', async () => {
    const fileInput = wrapper.findComponent(FileInput)
    const file = new File(['file'], 'example.json', { type: 'application/json' })
    const files = [file]

    fileInput.vm.$emit('change', { target: { files } })

    await nextTick()

    const deleteFile = wrapper
      .findAll('button')
      .find((button) => button.attributes().icon === 'pi pi-times') as DOMWrapper<HTMLButtonElement>
    await deleteFile.trigger('click')

    const fileList = wrapper.find('ul')
    expect(fileList.exists()).toBe(false)
  })
})
