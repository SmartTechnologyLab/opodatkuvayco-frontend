<template>
  <div class="md:hidden">
    <!-- Mobile menu button -->
    <button @click="isOpen = !isOpen" class="text-gray-300 hover:text-neon-green focus:outline-none">
      <svg
        v-if="!isOpen"
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>

      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    <!-- Mobile menu dropdown -->
    <div v-if="isOpen" class="absolute top-16 right-0 left-0 bg-gray-800 z-50 shadow-lg py-2 px-4">
      <nav class="flex flex-col space-y-3 mb-4">
        <a
          href="#features"
          @click="isOpen = false"
          class="text-gray-300 hover:text-neon-green transition-colors duration-300"
          >Функції</a
        >

        <a
          href="#calculator"
          @click="isOpen = false"
          class="text-gray-300 hover:text-neon-green transition-colors duration-300"
          >Калькулятор</a
        >

        <a href="#" @click="isOpen = false" class="text-gray-300 hover:text-neon-green transition-colors duration-300"
          >Про нас</a
        >
      </nav>

      <div class="flex flex-col space-y-3 pt-3 border-t border-gray-700">
        <template v-if="isAuthenticated">
          <span class="text-gray-300">Вітаємо, {{ user?.name || 'користувач' }}!</span>

          <button
            @click="
              $emit('logout')
              isOpen = false
            "
            class="w-full px-4 py-2 border border-neon-green text-neon-green hover:bg-neon-green hover:text-gray-900 transition-colors duration-300 rounded-md cursor-pointer"
          >
            Вийти
          </button>
        </template>

        <template v-else>
          <button
            @click="
              $emit('openLoginModal')
              isOpen = false
            "
            class="w-full px-4 py-2 border border-neon-green text-neon-green hover:bg-neon-green hover:text-gray-900 transition-colors duration-300 rounded-md cursor-pointer"
          >
            Увійти
          </button>

          <button
            @click="
              $emit('openRegistrationModal')
              isOpen = false
            "
            class="w-full px-4 py-2 bg-neon-green text-gray-900 hover:bg-neon-green-dark transition-colors duration-300 rounded-md cursor-pointer"
          >
            Реєстрація
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps({
  isAuthenticated: {
    type: Boolean,
    required: true
  },
  user: {
    type: Object,
    default: () => ({})
  }
})

defineEmits(['openLoginModal', 'openRegistrationModal', 'logout'])

const isOpen = ref(false)
</script>
