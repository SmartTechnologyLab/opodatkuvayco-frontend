<template>
  <div
    v-if="modelValue"
    class="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50"
    @click.self="closeModal"
  >
    <div class="bg-gray-800 p-8 rounded-lg w-full max-w-sm relative border border-gray-700">
      <button @click="closeModal" class="absolute top-4 right-4 text-gray-400 hover:text-white">
        <i class="fas fa-times"></i>
      </button>

      <div class="text-center">
        <div class="mb-4">
          <i class="fas fa-heart text-neon-green text-3xl"></i>
        </div>

        <h2 class="text-2xl font-bold text-white mb-2">Підтримати проект</h2>

        <p class="text-gray-400 mb-6 text-sm">
          Якщо сервіс був корисний — ви можете подякувати донатом на USDT-гаманець.
        </p>

        <div v-if="walletAddress">
          <div class="bg-white rounded-lg p-3 inline-block mb-4">
            <canvas ref="qrCanvas"></canvas>
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

            <button class="ml-3 text-neon-green hover:text-white transition-colors flex-shrink-0">
              <i :class="copied ? 'fas fa-check' : 'fas fa-copy'"></i>
            </button>
          </div>

          <p v-if="copied" class="text-neon-green text-xs mt-2">Адресу скопійовано!</p>
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

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const walletAddress = import.meta.env.VITE_DONATE_USDT_ADDRESS || ''
const qrCanvas = ref<HTMLCanvasElement | null>(null)
const copied = ref(false)

const { trackDonateModalOpened, trackDonateAddressCopied } = useAnalytics()

function closeModal() {
  emit('update:modelValue', false)
}

async function copyAddress() {
  if (!walletAddress) return
  await navigator.clipboard.writeText(walletAddress)
  copied.value = true
  trackDonateAddressCopied()
  setTimeout(() => {
    copied.value = false
  }, 2000)
}

watch(
  () => props.modelValue,
  async (isOpen) => {
    if (isOpen) {
      trackDonateModalOpened()
      if (walletAddress) {
        await nextTick()
        if (qrCanvas.value) {
          QRCode.toCanvas(qrCanvas.value, walletAddress, {
            width: 180,
            margin: 0,
            color: { dark: '#000000', light: '#ffffff' }
          })
        }
      }
    } else {
      copied.value = false
    }
  }
)
</script>
