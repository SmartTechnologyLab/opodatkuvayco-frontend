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
          class="p-3 bg-red-500/20 border border-red-400 text-red-100 rounded-md mb-4"
        >
          {{ errorMessage }}
        </div>

        <h3 class="text-2xl font-bold mb-4">Акції</h3>

        <div class="overflow-x-auto border border-gray-700 rounded-lg">
          <keep-alive>
            <TestDataTableForUser :key="reportData?.total" :data="reportData?.deals || []" :loading="isLoading" />
          </keep-alive>
        </div>

        <div v-if="reportData?.total" class="mt-6 p-4 bg-gray-800 rounded-lg">
          <!-- Используем flex-col на маленьких экранах и flex-row на средних и больших -->
          <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div class="mb-2 md:mb-0">
              <h4 class="text-lg font-semibold">Результат розрахунку:</h4>

              <p class="text-gray-400 text-sm">Дані за {{ YEAR }} рік</p>
            </div>

            <div class="flex flex-col sm:flex-row gap-4 sm:gap-8">
              <div v-if="reportData?.isTaxFree" class="text-left sm:text-right">
                <p class="text-xl font-bold text-neon-green">Не оподатковується</p>

                <p class="text-gray-400 text-sm">Прибуток у межах неоподатковуваного порогу</p>
              </div>

              <div v-if="reportData?.totalTaxFee" class="text-left sm:text-right">
                <p
                  class="text-xl font-bold text-neon-green cursor-pointer hover:brightness-125 transition select-none"
                  title="Клікніть, щоб скопіювати"
                  @click="copy('tax', Number(reportData.totalTaxFee))"
                >
                  <span v-if="copiedKey === 'tax'">Скопійовано ✓</span>

                  <span v-else>{{ $n(reportData.totalTaxFee, { style: 'currency', currency: Currency.UAH }) }}</span>
                </p>

                <p class="text-gray-400 text-sm">ПДФО ({{ TAX_RATE_PCT }}%)</p>
              </div>

              <div v-if="reportData?.totalMilitaryFee" class="text-left sm:text-right">
                <p
                  class="text-xl font-bold text-neon-green cursor-pointer hover:brightness-125 transition select-none"
                  title="Клікніть, щоб скопіювати"
                  @click="copy('mil', Number(reportData.totalMilitaryFee))"
                >
                  <span v-if="copiedKey === 'mil'">Скопійовано ✓</span>

                  <span v-else>{{
                    $n(reportData.totalMilitaryFee, { style: 'currency', currency: Currency.UAH })
                  }}</span>
                </p>

                <p class="text-gray-400 text-sm">Військовий збір ({{ MILITARY_RATE_PCT }}%)</p>
              </div>

              <div v-if="reportData?.total" class="text-left sm:text-right">
                <p
                  :class="[
                    'text-xl font-bold cursor-pointer hover:brightness-125 transition select-none',
                    reportData.total >= 0 ? 'text-neon-green' : 'text-red-400'
                  ]"
                  title="Клікніть, щоб скопіювати"
                  @click="copy('total', Number(reportData.total))"
                >
                  <span v-if="copiedKey === 'total'">Скопійовано ✓</span>

                  <span v-else>{{ $n(reportData.total, { style: 'currency', currency: Currency.UAH }) }}</span>
                </p>

                <p class="text-gray-400 text-sm">{{ reportData.total >= 0 ? 'Прибуток' : 'Збиток' }}</p>
              </div>
            </div>
          </div>

          <p class="mt-4 text-gray-500 text-xs italic leading-relaxed">
            Інвестиційний прибуток не підлягає оподаткуванню, якщо його розмір за рік не перевищує
            {{ $n(TAX_FREE_THRESHOLD, { style: 'currency', currency: Currency.UAH }) }}
            (прожитковий мінімум × 1,4 на {{ YEAR }} р.). Величина береться з налаштувань і може змінюватись щороку.
            Перевірте актуальне значення.
          </p>
        </div>

        <!-- Dividends Section -->
        <div v-if="dividendsData" class="mt-10">
          <h3 class="text-2xl font-bold mb-4">Дивіденди</h3>

          <DividendsDataTable :data="dividendsData.dividends" />

          <div class="mt-6 p-4 bg-gray-800 rounded-lg">
            <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <div class="mb-2 md:mb-0">
                <h4 class="text-lg font-semibold">Результат розрахунку:</h4>

                <p class="text-gray-400 text-sm">Податок сплачується завжди (без неоподатковуваного порогу)</p>
              </div>

              <div class="flex flex-col sm:flex-row gap-4 sm:gap-8">
                <div class="text-left sm:text-right">
                  <p
                    class="text-xl font-bold text-neon-green cursor-pointer hover:brightness-125 transition select-none"
                    title="Клікніть, щоб скопіювати"
                    @click="copy('div-pdfo', Number(dividendsData.pdfo))"
                  >
                    <span v-if="copiedKey === 'div-pdfo'">Скопійовано ✓</span>

                    <span v-else>{{ $n(dividendsData.pdfo, { style: 'currency', currency: Currency.UAH }) }}</span>
                  </p>

                  <p class="text-gray-400 text-sm">ПДФО ({{ DIVIDEND_RATE_PCT }}%)</p>
                </div>

                <div class="text-left sm:text-right">
                  <p
                    class="text-xl font-bold text-neon-green cursor-pointer hover:brightness-125 transition select-none"
                    title="Клікніть, щоб скопіювати"
                    @click="copy('div-mil', Number(dividendsData.militaryFee))"
                  >
                    <span v-if="copiedKey === 'div-mil'">Скопійовано ✓</span>

                    <span v-else>{{
                      $n(dividendsData.militaryFee, { style: 'currency', currency: Currency.UAH })
                    }}</span>
                  </p>

                  <p class="text-gray-400 text-sm">Військовий збір ({{ MILITARY_RATE_PCT }}%)</p>
                </div>

                <div class="text-left sm:text-right">
                  <p
                    class="text-xl font-bold text-neon-green cursor-pointer hover:brightness-125 transition select-none"
                    title="Клікніть, щоб скопіювати"
                    @click="copy('div-total', Number(dividendsData.totalAmountUah))"
                  >
                    <span v-if="copiedKey === 'div-total'">Скопійовано ✓</span>

                    <span v-else>{{
                      $n(dividendsData.totalAmountUah, { style: 'currency', currency: Currency.UAH })
                    }}</span>
                  </p>

                  <p class="text-gray-400 text-sm">Загальна сума дивідендів</p>
                </div>
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

        <!-- Donate CTA -->
        <div
          v-if="reportData?.total"
          class="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p class="text-gray-300 text-sm">
            <font-awesome-icon :icon="['fas', 'heart']" class="text-neon-green mr-1" />
            Якщо сервіс був корисний — ви можете подякувати донатом
          </p>

          <button
            @click="openDonateModal"
            class="w-min text-neon-green border border-neon-green px-4 py-2 rounded-md hover:bg-neon-green hover:text-gray-900 transition-all duration-300 text-sm whitespace-nowrap"
          >
            Підтримати проект
          </button>
        </div>

        <!-- Disclaimer -->
        <div v-if="reportData?.total" class="mt-6 p-4 bg-gray-800 bg-opacity-60 rounded-lg border border-gray-700">
          <p class="text-gray-300 text-sm leading-relaxed">
            <span class="font-semibold text-neon-green">⚠️ Важливо:</span> Всі розрахунки носять консультативний
            характер. Ми прагнемо максимально точно проводити розрахунки, але у нас недостатньо інформації по різних
            кейсах та фінансових інструментах, оскільки у нас немає прикладів звітів по них. Якщо у вас є специфічні
            угоди, ми будемо раді отримати від вас звіти з ними, і тоді ми зможемо зробити наш сервіс більш точним та
            зручним для вас.
            <a
              href="https://t.me/investuvayco"
              @click="handleTelegramClick"
              class="text-neon-green hover:text-neon-green-dark underline font-medium transition-colors"
            >
              Пишіть нам в Telegram </a
            >.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { type Deal, getDeal, getDividendsReport, getReport } from '@/components/common/DataTable/mocks'
import type { DividendsReport } from '@/components/common/DataTable/types'
import { computed } from 'vue'
import { Currency } from '@/constants/currencies'
import { ref, watch } from 'vue'
import TestDataTableForUser from '@/components/TestDataTableForUser/TestDataTableForUser.vue'
import DividendsDataTable from '@/components/TestDataTableForUser/DividendsDataTable.vue'

const dividendsReport = getDividendsReport()
import { handleTelegramLink } from '@/helpers/telegram'
import { useDonateModal } from '@/composables/useDonateModal'
import { useClipboard } from '@/composables/useClipboard'

const { openModal: openDonateModal } = useDonateModal()
const { copy, copiedKey } = useClipboard()

const activeTab = ref<'demo' | 'download'>('demo')

const reportData = ref<{
  total: number
  totalTaxFee: number
  totalMilitaryFee: number
  isTaxFree?: boolean
  deals: Deal[]
} | null>(null)

const fetchData = ref<{
  total: number
  totalTaxFee: number
  totalMilitaryFee: number
  isTaxFree?: boolean
  deals: Deal[]
  dividends?: DividendsReport
} | null>(null)

const dividendsData = computed<DividendsReport | null>(() => {
  if (activeTab.value === 'demo') return dividendsReport
  const apiDividends = fetchData.value?.dividends
  if (!apiDividends?.dividends?.length) return null
  return apiDividends
})

const YEAR = new Date().getFullYear() - 1

const TAX_FREE_THRESHOLD = !isNaN(parseFloat(import.meta.env.VITE_TAX_FREE_THRESHOLD_UAH))
  ? parseFloat(import.meta.env.VITE_TAX_FREE_THRESHOLD_UAH)
  : 4240

const TAX_RATE_PCT = !isNaN(parseFloat(import.meta.env.VITE_TAX_RATE))
  ? Math.round(parseFloat(import.meta.env.VITE_TAX_RATE) * 1000) / 10
  : 18
const MILITARY_RATE_PCT = !isNaN(parseFloat(import.meta.env.VITE_MILITARY_RATE))
  ? Math.round(parseFloat(import.meta.env.VITE_MILITARY_RATE) * 1000) / 10
  : 5
const DIVIDEND_RATE_PCT = !isNaN(parseFloat(import.meta.env.VITE_DIVIDEND_RATE))
  ? Math.round(parseFloat(import.meta.env.VITE_DIVIDEND_RATE) * 1000) / 10
  : 9

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
  } catch (error) {
    console.error('Error uploading file:', error)
    errorMessage.value = (error as Error).message
  } finally {
    isLoading.value = false
  }
}

watch(isLoading, () => {
  if (isLoading.value) {
    fetchData.value = null
  }
})

function handleTelegramClick(event: Event) {
  handleTelegramLink(event, 'investuvayco')
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
