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
            class="flex-1 px-4 py-3 bg-gray-700 hover:bg-gray-600 transition-colors duration-300 rounded-md text-center cursor-pointer"
            :class="{ 'bg-neon-green': activeTab === 'download', 'text-gray-900': activeTab === 'download' }"
            @click="activeTab = 'download'"
          >
            <i class="fas fa-upload mr-2"></i> Завантажити звіт
          </button>
          <button
            class="flex-1 px-4 py-3 bg-gray-700 hover:bg-neon-green-dark transition-colors duration-300 rounded-md text-center cursor-pointer"
            :class="{ 'bg-neon-green': activeTab === 'demo', 'text-gray-900': activeTab === 'demo' }"
            @click="activeTab = 'demo'"
          >
            <i class="fas fa-play mr-2"></i> Демо-приклад
          </button>
        </div>

        <div
          v-if="errorMessage && activeTab === 'download'"
          class="p-3 bg-red-500 bg-opacity-20 border border-red-500 text-red-500 rounded-md mb-4"
        >
          {{ errorMessage }}
        </div>

        <div v-if="activeTab === 'download'" class="overflow-x-auto border border-gray-700 rounded-lg">
          <table class="min-w-full divide-y divide-gray-700">
            <thead class="bg-gray-800">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Дата
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Тікер
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Кількість
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Купівля
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Продаж
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Прибуток
                </th>
              </tr>
            </thead>
            <tbody v-if="reportData?.deals" class="bg-gray-900 divide-y divide-gray-800">
              <tr v-for="deal in reportData?.deals" :key="deal.id">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{{ $d(deal.sale.date) }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{{ deal.ticker }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{{ deal.quantity }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {{ $n(deal.purchase.uah, { style: 'currency', currency: Currency.UAH }) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {{ $n(deal.sale.uah, { style: 'currency', currency: Currency.UAH }) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{{ $n(deal.total) }}</td>
              </tr>
            </tbody>

            <tbody v-else>
              <tr>
                <td colspan="6" class="px-6 py-4 text-center text-sm text-gray-400">Немає даних для відображення</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Demo Table -->
        <div v-if="activeTab === 'demo'" class="overflow-x-auto border border-gray-700 rounded-lg">
          <table class="min-w-full divide-y divide-gray-700">
            <thead class="bg-gray-800">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Дата
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Тікер
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Тип операції
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Кількість
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Ціна
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Сума
                </th>
              </tr>
            </thead>
            <tbody class="bg-gray-900 divide-y divide-gray-800">
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">2025-04-15</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">AAPL</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-green-400">Купівля</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">10</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">$190.25</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">$1,902.50</td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">2025-04-10</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">MSFT</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-red-400">Продаж</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">5</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">$415.80</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">$2,079.00</td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">2025-03-28</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">AMZN</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-green-400">Купівля</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">3</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">$180.50</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">$541.50</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="mt-6 p-4 bg-gray-800 rounded-lg">
          <div v-if="activeTab === 'demo'" class="flex justify-between items-center">
            <div>
              <h3 class="text-lg font-semibold">Результат розрахунку:</h3>
              <p class="text-gray-400 text-sm">Дані за 2025 рік</p>
            </div>

            <div class="text-right">
              <p class="text-xl font-bold text-neon-green">1,425.75 грн</p>
              <p class="text-gray-400 text-sm">Податок до сплати</p>
            </div>
          </div>

          <div v-if="activeTab === 'download'" class="flex justify-between items-center">
            <div>
              <h3 class="text-lg font-semibold">Результат розрахунку:</h3>
              <p class="text-gray-400 text-sm">Дані за 2025 рік</p>
            </div>
            <div v-if="reportData?.totalTaxFee" class="text-right">
              <p class="text-xl font-bold text-neon-green">
                {{ $n(reportData.totalTaxFee, { style: 'currency', currency: Currency.UAH }) }}
              </p>
              <p class="text-gray-400 text-sm">Податок до сплати</p>
            </div>
            <div v-if="reportData?.totalMilitaryFee" class="text-right">
              <p class="text-xl font-bold text-neon-green">
                {{ $n(reportData.totalMilitaryFee, { style: 'currency', currency: Currency.UAH }) }}
              </p>
              <p class="text-gray-400 text-sm">Військовий збір до сплати</p>
            </div>
            <div v-if="reportData?.total" class="text-right">
              <p class="text-xl font-bold text-neon-green">
                {{ $n(reportData.total, { style: 'currency', currency: Currency.UAH }) }}
              </p>
              <p class="text-gray-400 text-sm">Прибуток</p>
            </div>
          </div>
        </div>

        <div v-if="activeTab !== 'download'" class="mt-6 flex justify-center">
          <button
            class="px-8 py-3 bg-neon-green text-gray-900 font-medium hover:bg-neon-green-dark transition-all duration-300 shadow-neon rounded-md cursor-pointer"
            @click="activeTab = 'download'"
          >
            Отримати повний розрахунок
          </button>
        </div>

        <div v-if="activeTab === 'download'" class="mt-6 flex justify-center w-full">
          <label
            for="file-upload"
            class="px-8 w-full flex justify-center py-3 bg-neon-green text-gray-900 font-medium hover:bg-neon-green-dark transition-all duration-300 shadow-neon rounded-md cursor-pointer"
          >
            <i class="fas fa-file-upload mr-2"></i> Завантажити звіт
            <input id="file-upload" type="file" multiple class="hidden" @input="onFileUpload" />
          </label>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Deal } from '@/components/common/DataTable/mocks'
import { Currency } from '@/constants/currencies'
import { ref } from 'vue'

const activeTab = ref<'demo' | 'download'>('demo')

const reportData = ref<{
  total: number
  totalTaxFee: number
  totalMilitaryFee: number
  deals: Deal[]
}>()

const errorMessage = ref('')

const onFileUpload = async (event: Event) => {
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

    reportData.value = data

    console.log('Report data:', reportData.value)
  } catch (error) {
    console.error('Error uploading file:', error)
    errorMessage.value = (error as Error).message
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
