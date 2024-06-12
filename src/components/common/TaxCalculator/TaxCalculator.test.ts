import { DOMWrapper, shallowMount, type VueWrapper } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import TaxCalculator from '@/components/common/TaxCalculator/TaxCalculator.vue'
import FileInput from '@/components/common/FileInput/FileInput.vue'
import { nextTick } from 'vue'

const file = new File(['file'], 'example.json', { type: 'application/json' })

const mockDataTransfer = {
  files: [file],
  items: {
    add: vi.fn()
  }
}

describe('TaxCalculator component', () => {
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

  it('When result is null or isCalculating is false - FileInput renders', () => {
    const fileInput = wrapper.findComponent(FileInput)
    const resultInput = wrapper.find('input[type="text"]')

    expect(fileInput.exists()).toBe(true)
    expect(resultInput.exists()).toBe(false)
  })

  const ONE = '1'
  const TWO = '2'
  const THREE = '3'
  const PLUS = '+'
  const MINUS = '-'
  const MULTIPLY = '*'
  const DIVIDE = '/'
  const EQUAL = '='
  const CLEAR = 'C'
  it('When the button with number is clicked, the result input is mounted into DOM', async () => {
    const numberBtn = findButtonByText(ONE)

    await numberBtn.trigger('click')

    expect(wrapper.findComponent(FileInput).exists()).toBe(false)
    expect(wrapper.find('input').exists()).toBe(true)
  })

  it('When the reset button clicked, the result input is unmounted from DOM and the FileInput renders', async () => {
    const numberBtn = findButtonByText(ONE)
    const resetBtn = findButtonByText(CLEAR)

    await numberBtn?.trigger('click')

    expect(wrapper.findComponent(FileInput).exists()).toBe(false)
    expect(wrapper.find('input').exists()).toBe(true)

    await resetBtn.trigger('click')

    const resultInput = wrapper.find('input[type="text"]')

    expect(wrapper.findComponent(FileInput).exists()).toBe(true)
    expect(resultInput.exists()).toBe(false)
  })

  it('Calctulating the sum correctly', async () => {
    const RESULT = '3'
    const equalBtn = findButtonByText(EQUAL)
    const plusBtn = findButtonByText(PLUS)
    const oneBtn = findButtonByText(ONE)
    const twoBtn = findButtonByText(TWO)

    await oneBtn.trigger('click')

    await plusBtn.trigger('click')

    await twoBtn.trigger('click')

    await equalBtn.trigger('click')

    const resultInput = wrapper.find('input[type="text"]')
    expect((resultInput.element as HTMLInputElement).value).toStrictEqual(RESULT)
  })

  it('Calctulating the difference correctly', async () => {
    const RESULT = '-1'
    const equalBtn = findButtonByText(EQUAL)
    const minusBtn = findButtonByText(MINUS)
    const oneBtn = findButtonByText(ONE)
    const twoBtn = findButtonByText(TWO)

    await oneBtn.trigger('click')

    await minusBtn.trigger('click')

    await twoBtn.trigger('click')

    await equalBtn.trigger('click')

    const resultInput = wrapper.find('input[type="text"]')
    expect((resultInput.element as HTMLInputElement).value).toStrictEqual(RESULT)
  })

  it('Calctulating the multiplication correctly', async () => {
    const RESULT = '6'
    const equalBtn = findButtonByText(EQUAL)
    const multiplyBtn = findButtonByText(MULTIPLY)
    const twoBtn = findButtonByText(TWO)
    const threeBtn = findButtonByText(THREE)

    await threeBtn.trigger('click')

    await multiplyBtn.trigger('click')

    await twoBtn.trigger('click')

    await equalBtn.trigger('click')

    const resultInput = wrapper.find('input[type="text"]')
    expect((resultInput.element as HTMLInputElement).value).toStrictEqual(RESULT)
  })

  it('Calctulating the division correctly', async () => {
    const RESULT = '1'
    const equalBtn = findButtonByText(EQUAL)
    const divisionBtn = findButtonByText(DIVIDE)
    const threeBtn = findButtonByText(THREE)

    await threeBtn.trigger('click')

    await divisionBtn.trigger('click')

    await threeBtn.trigger('click')

    await equalBtn.trigger('click')

    const resultInput = wrapper.find('input[type="text"]')
    expect((resultInput.element as HTMLInputElement).value).toEqual(RESULT)
  })

  it('Set the number to negative correctly', async () => {
    const RESULT = '0'
    const equalBtn = findButtonByText(EQUAL)
    const plusBtn = findButtonByText(PLUS)
    const negativeBtn = findButtonByText('+/-')
    const threeBtn = findButtonByText(THREE)

    await threeBtn?.trigger('click')

    await plusBtn?.trigger('click')

    await negativeBtn?.trigger('click')

    await threeBtn?.trigger('click')

    await equalBtn.trigger('click')

    const resultInput = wrapper.find('input')
    expect((resultInput.element as HTMLInputElement).value).toEqual(RESULT)
  })

  it('Handles file input change', async () => {
    const fileInput = wrapper.findComponent(FileInput).find('input[type="file"]')

    Object.defineProperty(fileInput.element, 'files', {
      value: mockDataTransfer.files
    })

    await fileInput.trigger('change')

    await nextTick()

    const fileItem = wrapper.findAll('span').find((span) => span.text() === file.name) as DOMWrapper<HTMLSpanElement>
    expect(fileItem.exists()).toBe(true)
    expect(fileItem.text()).toContain('example.json')
  })

  it('Deletes file correctly', async () => {
    const fileInput = wrapper.findComponent(FileInput).find('input[type="file"]')

    Object.defineProperty(fileInput.element, 'files', {
      value: mockDataTransfer.files
    })

    await fileInput.trigger('change')

    await nextTick()

    const deleteButton = wrapper
      .findAll('button')
      .find((button) => button.attributes().icon === 'pi pi-times') as DOMWrapper<HTMLButtonElement>

    await deleteButton.trigger('click')

    await nextTick()

    const fileList = wrapper.find('ul')
    expect(fileList.exists()).toBe(false)
  })

  it('Equal button has type of submit when files is defined', async () => {
    const fileInput = wrapper.findComponent(FileInput).find('input[type="file"]')

    Object.defineProperty(fileInput.element, 'files', {
      value: mockDataTransfer.files
    })

    await fileInput.trigger('change')

    expect(findButtonByText(EQUAL).attributes().type).toEqual('submit')
  })

  it('Equal button reset type to button when ', async () => {
    const fileInput = wrapper.findComponent(FileInput).find('input[type="file"]')

    Object.defineProperty(fileInput.element, 'files', {
      value: mockDataTransfer.files
    })

    await fileInput.trigger('change')

    expect(findButtonByText(EQUAL).attributes().type).toEqual('submit')

    const deleteButton = wrapper
      .findAll('button')
      .find((button) => button.attributes().icon === 'pi pi-times') as DOMWrapper<HTMLButtonElement>

    await deleteButton.trigger('click')

    expect(findButtonByText(EQUAL).attributes().type).toEqual('button')
  })
})
