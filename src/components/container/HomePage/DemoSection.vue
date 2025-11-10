<template>
  <!-- Demo Section -->
  <section class="py-16 bg-gray-800">
    <div class="container mx-auto px-6">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold mb-4">Спробуйте <span class="text-neon-green">прямо зараз</span></h2>

        <p class="text-gray-400 max-w-2xl mx-auto">
          Завантажте свій звіт брокера або використайте наш демо-приклад, щоб побачити, як працює сервіс
        </p>
      </div>

      <div class="max-w-6xl mx-auto bg-gray-900 p-6 rounded-lg border border-gray-700 shadow-xl">
        <div class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6">
          <button
            :class="[activeTab === 'download' ? 'primary-btn' : 'secondary-btn', 'btn-sm']"
            @click="activeTab = 'download'"
          >
            Розрахувати
          </button>

          <button
            :class="[activeTab === 'demo' ? 'primary-btn' : 'secondary-btn', 'btn-sm']"
            @click="activeTab = 'demo'"
          >
            Демо-приклад
          </button>
        </div>

        <div
          v-if="errorMessage && activeTab === 'download'"
          class="p-3 bg-red-500 bg-opacity-20 border border-red-500 text-red-500 rounded-md mb-4"
        >
          {{ errorMessage }}
        </div>

        <div class="overflow-x-auto border border-gray-700 rounded-lg">
          <keep-alive>
            <TestDataTableForUser :key="reportData?.total" :data="reportData?.deals || []" :loading="isLoading" />
          </keep-alive>
        </div>

        <div v-if="reportData?.total" class="mt-6 p-4 bg-gray-800 rounded-lg">
          <!-- Используем flex-col на маленьких экранах и flex-row на средних и больших -->
          <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div class="mb-2 md:mb-0">
              <h3 class="text-lg font-semibold">Результат розрахунку:</h3>

              <p class="text-gray-400 text-sm">Дані за {{ YEAR }} рік</p>
            </div>

            <div class="flex flex-col sm:flex-row gap-4 sm:gap-8">
              <div v-if="reportData?.totalTaxFee" class="text-left sm:text-right">
                <p class="text-xl font-bold text-neon-green">
                  {{ $n(reportData.totalTaxFee, { style: 'currency', currency: Currency.UAH }) }}
                </p>

                <p class="text-gray-400 text-sm">ПДФО до сплати</p>
              </div>

              <div v-if="reportData?.totalMilitaryFee" class="text-left sm:text-right">
                <p class="text-xl font-bold text-neon-green">
                  {{ $n(reportData.totalMilitaryFee, { style: 'currency', currency: Currency.UAH }) }}
                </p>

                <p class="text-gray-400 text-sm">Військовий збір до сплати</p>
              </div>

              <div v-if="reportData?.total" class="text-left sm:text-right">
                <p
                  :class="{
                    'text-xl': true,
                    'font-bold': true,
                    'text-neon-green': reportData.total >= 0,
                    'text-red-400': reportData.total < 0
                  }"
                >
                  {{ $n(reportData.total, { style: 'currency', currency: Currency.UAH }) }}
                </p>

                <p class="text-gray-400 text-sm">{{ reportData.total >= 0 ? 'Прибуток' : 'Збиток' }}</p>
              </div>
            </div>
          </div>
        </div>

        <!--        <div v-if="activeTab !== 'download'" class="mt-6 flex justify-center">-->
        <!--          <button-->
        <!--            class="px-8 py-3 bg-neon-green text-gray-900 font-medium hover:bg-neon-green-dark transition-all duration-300 shadow-neon rounded-md cursor-pointer"-->
        <!--            @click="activeTab = 'download'"-->
        <!--          >-->
        <!--            Отримати повний розрахунок-->
        <!--          </button>-->
        <!--        </div>-->

        <div v-if="activeTab === 'download'" class="mt-6 flex justify-center w-full">
          <label
            for="file-upload"
            class="px-8 w-full flex justify-center py-3 bg-neon-green text-gray-900 font-medium hover:bg-neon-green-dark transition-all duration-300 shadow-neon rounded-md cursor-pointer"
          >
            Завантажити звіт
            <input id="file-upload" type="file" multiple class="hidden" @input="onFileUpload" />
          </label>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { type Deal, getDeal, getReport } from '@/components/common/DataTable/mocks'
import { Currency } from '@/constants/currencies'
import { ref, watch } from 'vue'
import TestDataTableForUser from '@/components/TestDataTableForUser/TestDataTableForUser.vue'

const activeTab = ref<'demo' | 'download'>('demo')

const reportData = ref<{
  total: number
  totalTaxFee: number
  totalMilitaryFee: number
  deals: Deal[]
} | null>(null)

const fetchData = ref<{
  total: number
  totalTaxFee: number
  totalMilitaryFee: number
  deals: Deal[]
} | null>(null)

const YEAR = new Date().getFullYear() - 1

watch(
  [activeTab, fetchData],
  () => {
    if (activeTab.value === 'demo') {
      const demoData = [getDeal(), getDeal(), getDeal()]
      const demoTotal = getReport(demoData)

      reportData.value = {
        deals: demoData,
        ...demoTotal
      }
    } else {
      reportData.value = fetchData.value ? { ...fetchData.value } : null
    }
  },
  { immediate: true }
)

const errorMessage = ref('')
const isLoading = ref(false)

const onFileUpload = async (event: Event) => {
  isLoading.value = true

  try {
    errorMessage.value = ''
    const target = event.target as HTMLInputElement
    const files = target.files

    if (!files) return

    const formData = new FormData()

    Array.from(files).forEach((file) => {
      formData.append('files', file)
    })

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/report/create-report?fileType=json&stockExchange=freedom_finance`,
      {
        method: 'POST',
        body: formData
      }
    )

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to upload file')
    }

    fetchData.value = data

    console.log('Report data:', data)
  } catch (error) {
    console.error('Error uploading file:', error)
    errorMessage.value = (error as Error).message
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.aspect-w-16 > * {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.shadow-neon {
  box-shadow:
    0 0 10px rgba(0, 255, 148, 0.5),
    0 0 20px rgba(0, 255, 148, 0.2);
}
</style>
