<template>
  <!-- Calculator Section -->
  <section id="calculator" class="py-16 bg-gray-800">
    <div class="container mx-auto px-6">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold mb-4">Калькулятор <span class="text-neon-green">економії</span></h2>
        <p class="text-gray-400 max-w-2xl mx-auto">
          Дізнайтеся, скільки часу та грошей ви можете заощадити з нашим сервісом
        </p>
      </div>
      <div class="max-w-3xl mx-auto bg-gray-900 p-6 rounded-lg border border-gray-700 shadow-xl">
        <div class="grid grid-cols-1 gap-4 mb-6">
          <div>
            <label class="block text-gray-400 mb-2 text-sm">Кількість операцій на рік</label>
            <div class="flex items-center space-x-4">
              <input
                type="range"
                min="10"
                max="500"
                step="5"
                v-model="operationsCount"
                class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
              <span class="min-w-[3rem] text-center text-neon-green font-bold">{{ operationsCount }}</span>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-gray-400 mb-2 text-sm">Хвилин на операцію</label>
              <div class="relative">
                <input
                  type="number"
                  min="1"
                  max="60"
                  v-model="timePerOperation"
                  class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:border-neon-green text-sm"
                />
                <span class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">хв</span>
              </div>
            </div>
            <div>
              <label class="block text-gray-400 mb-2 text-sm">Вартість години</label>
              <div class="relative">
                <input
                  type="number"
                  min="0"
                  v-model="hourlyRate"
                  class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:border-neon-green text-sm"
                />
                <span class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">грн</span>
              </div>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-1 gap-8">
          <div class="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h3 class="text-xl font-semibold mb-4 flex items-center">
              <i class="fas fa-clock text-neon-green mr-2"></i>
              Економія часу та коштів
            </h3>
            <div class="flex flex-col space-y-4">
              <div class="bg-gray-700 p-4 rounded-lg">
                <p class="text-gray-400 mb-1">Ручний розрахунок</p>
                <p class="text-lg">{{ manualTimeCalculation * 60 }} хвилин</p>
              </div>
              <div class="bg-gray-700 p-4 rounded-lg">
                <p class="text-gray-400 mb-1">З Оподаткувайко</p>
                <p class="text-lg">{{ Math.round(((operationsCount * 0.5) / 1000) * 10) / 10 }} секунд</p>
              </div>
              <div class="bg-gray-700 p-4 rounded-lg">
                <p class="text-gray-400 mb-1">Економія</p>
                <p class="text-xl font-bold text-neon-green">
                  {{ Math.round(manualTimeCalculation * 60 - (operationsCount * 5) / 60) }} хвилин
                </p>
                <p class="text-lg font-bold text-neon-green">{{ moneySaved }} грн</p>
              </div>
            </div>
            <div class="mt-4 h-4 bg-gray-700 rounded-full overflow-hidden">
              <div class="h-full bg-neon-green" :style="{ width: timeSavingsPercentage + '%' }"></div>
            </div>
          </div>
          <div class="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h3 class="text-xl font-semibold mb-4 flex items-center">
              <i class="fas fa-exclamation-triangle text-neon-green mr-2"></i>
              Ризик помилок
            </h3>
            <div class="bg-gray-700 p-4 rounded-lg">
              <p class="text-gray-400 mb-1">Ймовірність помилки</p>
              <p class="text-xl font-bold text-red-400">{{ errorRiskPercentage }}%</p>
            </div>
            <div class="mt-4 h-4 bg-gray-700 rounded-full overflow-hidden">
              <div class="h-full bg-red-400" :style="{ width: errorRiskPercentage + '%' }"></div>
            </div>
            <p class="mt-4 text-sm text-gray-400">
              Ймовірність помилки зростає пропорційно до кількості операцій. При ручному розрахунку більша кількість
              операцій значно підвищує ризик допущення помилок.
            </p>
          </div>
        </div>
        <div class="mt-8 text-center">
          <p class="text-gray-400 mb-4">
            Автоматизація розрахунків податків з Оподаткувайко заощадить вам
            <span class="text-neon-green font-bold">{{ Math.round(timeSavings / 60) }} годин</span>
            та допоможе уникнути потенційних помилок.
          </p>
          <button
            class="px-8 py-3 bg-neon-green text-gray-900 font-medium hover:bg-neon-green-dark transition-all duration-300 shadow-neon !rounded-button whitespace-nowrap cursor-pointer"
          >
            Почати економити час
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Calculator values
const operationsCount = ref(100)
// Time calculations
const timePerOperation = ref(3)
const hourlyRate = ref(500)
const manualTimeCalculation = computed(() => {
  return Math.ceil((operationsCount.value * timePerOperation.value) / 60)
})
const autoTimeCalculation = computed(() => {
  // Fixed time with our tool - 30 seconds per operation
  return Math.ceil((operationsCount.value * 0.5) / 60)
})
const timeSavings = computed(() => {
  return Math.max(0, manualTimeCalculation.value - autoTimeCalculation.value)
})
const timeSavingsPercentage = computed(() => {
  return Math.round((timeSavings.value / manualTimeCalculation.value) * 100)
})
const moneySaved = computed(() => {
  return Math.round(timeSavings.value * hourlyRate.value)
})
// Error risk calculations
const errorRiskPercentage = computed(() => {
  // Higher operation count means higher error risk
  return Math.min(5 + Math.round(operationsCount.value / 20), 40)
})
</script>
