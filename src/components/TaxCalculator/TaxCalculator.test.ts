import { describe, expect, it } from 'vitest'
import TaxCalculator from './TaxCalculator.vue'
import { mount } from '@vue/test-utils'

describe('Tax calculator', () => {
  const calculator = mount(TaxCalculator)

  it('render onMounting', () => {
    expect(calculator.exists()).toBeTruthy()
  })

  it('reset result correctly', async () => {
    ;(calculator.vm as any).result = '123'
    ;(calculator.vm as any).isCalculating = false
    ;(calculator.vm as any).reset()

    await calculator.vm.$nextTick()

    expect((calculator.vm as any).result).toBe('')
    expect((calculator.vm as any).isCalculating).toBe(false)
  })

  it('calculates positive numbers correctly', async () => {
    ;(calculator.vm as any).result = '2+2'
    ;(calculator.vm as any).isCalculating = false
    ;(calculator.vm as any).calculate()

    await calculator.vm.$nextTick()

    expect((calculator.vm as any).result).toBe(4)
    expect((calculator.vm as any).isCalculating).toBe(true)
  })

  it('calculates negative numbers correctly', async () => {
    ;(calculator.vm as any).result = '2*-2'
    ;(calculator.vm as any).isCalculating = false
    ;(calculator.vm as any).calculate()

    await calculator.vm.$nextTick()

    expect((calculator.vm as any).result).toBe(-4)
    expect((calculator.vm as any).isCalculating).toBe(true)
  })

  it('add files to selectedFiles array correctly', async () => {
    const mockEvent = {
      target: {
        files: [{ name: 'file.json' }]
      }
    }

    ;(calculator.vm as any).handleFileChange(mockEvent)

    await calculator.vm.$nextTick()

    expect((calculator.vm as any).selectedFiles).toEqual([{ name: 'file.json' }])
  })

  it('removes the specified file from selectedFiles array', async () => {
    const mockFiles = [{ name: 'file.json' }, { name: 'file.txt' }]

    ;(calculator.vm as any).selectedFiles = mockFiles
    ;(calculator.vm as any).handleDeleteFile((calculator.vm as any).selectedFiles[0])

    await calculator.vm.$nextTick()
    expect((calculator.vm as any).selectedFiles).toEqual([mockFiles[1]])
  })
})
