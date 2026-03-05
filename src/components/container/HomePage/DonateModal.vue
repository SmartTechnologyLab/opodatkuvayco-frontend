<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50"
    @click.self="closeModal"
  >
    <div class="bg-gray-800 p-8 rounded-lg w-full max-w-sm relative border border-gray-700">
      <button
        @click="closeModal"
        class="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors w-8 h-8 flex items-center justify-center"
      >
        <font-awesome-icon :icon="['fas', 'xmark']" class="w-5 h-5" />
      </button>

      <div class="text-center">
        <div class="mb-4">
          <font-awesome-icon :icon="['fas', 'heart']" class="text-neon-green text-3xl" />
        </div>

        <h2 class="text-2xl font-bold text-white mb-2">Підтримати проект</h2>

        <p class="text-gray-400 mb-6 text-sm">
          Якщо сервіс був корисний — ви можете подякувати донатом на USDT-гаманець.
        </p>

        <div v-if="walletAddress">
          <div class="bg-white rounded-lg p-3 inline-block mb-4">
            <canvas v-show="!qrError" ref="qrCanvas"></canvas>

            <p v-if="qrError" class="text-red-400 text-xs p-4">Не вдалося згенерувати QR-код</p>
          </div>

          <div class="mb-2">
            <span class="inline-block bg-gray-700 text-neon-green text-xs font-semibold px-3 py-1 rounded-full">
              USDT (TRC-20 / Tron)
            </span>
          </div>

          <div
            class="flex items-center bg-gray-700 rounded-md p-3 mt-4 border border-gray-600 cursor-pointer hover:border-neon-green transition-colors duration-300"
            @click="copyAddress"
          >
            <span class="text-gray-300 text-xs break-all flex-1 text-left font-mono">
              {{ walletAddress }}
            </span>

            <button class="w-min ml-3 text-neon-green hover:text-white transition-colors flex-shrink-0">
              <font-awesome-icon :icon="['fas', copied ? 'check' : 'copy']" />
            </button>
          </div>

          <p class="text-xs mt-2 h-4" :class="copied ? 'text-neon-green' : copyError ? 'text-red-400' : 'invisible'">
            {{ copied ? 'Адресу скопійовано!' : 'Не вдалося скопіювати адресу' }}
          </p>
        </div>

        <div v-else class="text-gray-500 text-sm py-8">Адреса гаманця не налаштована.</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import QRCode from 'qrcode'
import { useAnalytics } from '@/composables/useAnalytics'
import { useDonateModal } from '@/composables/useDonateModal'

const { isVisible, closeModal } = useDonateModal()

const walletAddress = import.meta.env.VITE_DONATE_USDT_ADDRESS || ''
const qrCanvas = ref<HTMLCanvasElement | null>(null)
const copied = ref(false)
const copyError = ref(false)
const qrError = ref(false)

const { trackDonateModalOpened, trackDonateAddressCopied } = useAnalytics()

async function copyAddress() {
  if (!walletAddress) return
  try {
    if (!navigator.clipboard) {
      throw new Error('Clipboard API not available')
    }
    await navigator.clipboard.writeText(walletAddress)
    copied.value = true
    trackDonateAddressCopied()
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch {
    copyError.value = true
    setTimeout(() => {
      copyError.value = false
    }, 2000)
  }
}

watch(isVisible, async (isOpen) => {
  if (isOpen) {
    trackDonateModalOpened()
    if (walletAddress) {
      await nextTick()
      if (qrCanvas.value) {
        try {
          await QRCode.toCanvas(qrCanvas.value, walletAddress, {
            width: 180,
            margin: 0,
            color: { dark: '#000000', light: '#ffffff' }
          })
        } catch {
          qrError.value = true
        }
      }
    }
  } else {
    copied.value = false
    qrError.value = false
  }
})
</script>
