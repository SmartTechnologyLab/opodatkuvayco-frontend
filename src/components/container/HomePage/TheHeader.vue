<script setup lang="ts">
import { ref } from 'vue'
import LoginModal from '@/components/container/HomePage/LoginModal.vue'
import RegistrationModal from '@/components/container/HomePage/RegistrationModal.vue'

const showLoginModal = ref(false)
const showRegistrationModal = ref(false)

const openLoginModal = () => {
  showLoginModal.value = true
}

const openRegistrationModal = () => {
  showRegistrationModal.value = true
}

const closeLoginModal = () => {
  showLoginModal.value = false
}

const closeRegistrationModal = () => {
  showRegistrationModal.value = false
}
</script>

<template>
  <header class="bg-white shadow-sm">
    <!-- Navbar -->
    <nav class="border-b border-gray-800 bg-gray-900 py-4">
      <div class="container mx-auto flex items-center justify-between px-6">
        <div class="flex items-center">
          <span class="text-2xl font-bold text-neon-green">Оподаткувайко</span>
        </div>
        <div class="hidden md:flex items-center space-x-8">
          <a href="#features" class="hover:text-neon-green transition-colors duration-300 cursor-pointer">Можливості</a>
          <a href="#calculator" class="hover:text-neon-green transition-colors duration-300 cursor-pointer">
            Калькулятор
          </a>
          <a href="#pricing" class="hover:text-neon-green transition-colors duration-300 cursor-pointer">Тарифи</a>
          <a href="#faq" class="hover:text-neon-green transition-colors duration-300 cursor-pointer">FAQ</a>
        </div>
        <div class="flex items-center space-x-4">
          <button
            @click="openLoginModal"
            class="px-4 py-2 text-sm border border-neon-green text-neon-green hover:bg-neon-green hover:text-gray-900 transition-colors duration-300 !rounded-button whitespace-nowrap cursor-pointer"
          >
            Увійти
          </button>
          <button
            @click="openRegistrationModal"
            class="px-4 py-2 text-sm bg-neon-green text-gray-900 hover:bg-neon-green-dark transition-colors duration-300 !rounded-button whitespace-nowrap cursor-pointer"
          >
            Реєстрація
          </button>
        </div>
      </div>
    </nav>
  </header>

  <!-- Login Modal -->
  <LoginModal v-model="showLoginModal" @login="closeLoginModal" @switch-to-register="openRegistrationModal" />

  <!-- Registration Modal -->
  <RegistrationModal
    v-model="showRegistrationModal"
    @regist="closeRegistrationModal"
    @switch-to-login="openLoginModal"
  />
</template>

<style scoped lang="scss">
.text-neon-green {
  color: #00ff94;
}
.bg-neon-green {
  background-color: #00ff94;
}
.bg-neon-green-dark {
  background-color: #00cc78;
}
.border-neon-green {
  border-color: #00ff94;
}
</style>
