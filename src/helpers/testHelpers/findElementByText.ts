import type { VueWrapper } from '@vue/test-utils'

export const findElementByText = (wrapper: VueWrapper, element: keyof HTMLElementTagNameMap, text: string) => {
  return wrapper.findAll(element).find((el) => el.text() === text)
}
