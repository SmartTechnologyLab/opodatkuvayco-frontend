import { ref, computed } from 'vue'

export function useCalculator() {
  const operationsCount = ref(100)

  // Расчет времени на ручную обработку (в часах)
  const manualTimeCalculation = computed(() => {
    return Math.round(operationsCount.value * 0.05 * 10) / 10
  })

  // Расчет времени на автоматическую обработку (в часах)
  const autoTimeCalculation = computed(() => {
    return Math.round(operationsCount.value * 0.005 * 10) / 10
  })

  // Экономия времени
  const timeSavings = computed(() => {
    return Math.round((manualTimeCalculation.value - autoTimeCalculation.value) * 10) / 10
  })

  // Процент экономии времени
  const timeSavingsPercentage = computed(() => {
    return Math.min(90, Math.round((timeSavings.value / manualTimeCalculation.value) * 100))
  })

  // ��роцент риска совершения ошибки
  const errorRiskPercentage = computed(() => {
    return Math.min(90, Math.round(operationsCount.value / 5))
  })

  // Потенциальные финансовые потери от ошибок
  const potentialLoss = computed(() => {
    return Math.round(operationsCount.value * 50)
  })

  return {
    operationsCount,
    manualTimeCalculation,
    autoTimeCalculation,
    timeSavings,
    timeSavingsPercentage,
    errorRiskPercentage,
    potentialLoss
  }
}
