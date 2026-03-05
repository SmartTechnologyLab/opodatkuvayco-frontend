<template>
  <header class="bg-white shadow-sm sticky top-0 z-50">
    <!-- Navbar -->
    <nav class="border-b border-gray-800 bg-gray-900 py-4">
      <div class="container mx-auto flex items-center justify-between px-6">
        <div class="flex items-center">
          <router-link to="/" @click="scrollToTop" class="text-2xl font-bold text-neon-green cursor-pointer">
            Оподаткувайко
          </router-link>
        </div>

        <div class="hidden md:flex items-center space-x-8">
          <router-link
            @click="scrollToTop"
            to="/"
            class="hover:text-neon-green transition-colors duration-300 cursor-pointer"
          >
            Головна
          </router-link>

          <router-link to="/about" class="hover:text-neon-green transition-colors duration-300 cursor-pointer">
            Про нас
          </router-link>

          <a
            href="#demo"
            class="hover:text-neon-green transition-colors duration-300 cursor-pointer"
            @click.prevent="scrollToDemo"
          >
            Demo
          </a>

          <button
            @click="showDonateModal = true"
            class="text-neon-green border border-neon-green px-4 py-1.5 rounded-md hover:bg-neon-green hover:text-gray-900 transition-all duration-300 text-sm font-medium"
          >
            <i class="fas fa-heart mr-1.5"></i>
            Підтримати
          </button>
          <!--                    <a href="#features" class="hover:text-neon-green transition-colors duration-300 cursor-pointer">Можливості</a>-->

          <!--          <a href="#calculator" class="hover:text-neon-green transition-colors duration-300 cursor-pointer">-->
          <!--            Калькулятор-->
          <!--          </a>-->

          <!--          <a href="#pricing" class="hover:text-neon-green transition-colors duration-300 cursor-pointer">Тарифи</a>-->

          <!--          <a href="#faq" class="hover:text-neon-green transition-colors duration-300 cursor-pointer">FAQ</a>-->
        </div>
      </div>
    </nav>
    <DonateModal v-model="showDonateModal" />
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import DonateModal from './DonateModal.vue'

const showDonateModal = ref(false)

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const router = useRouter()

function scrollToDemo(event: Event) {
  event.preventDefault()

  if (router.currentRoute.value.path !== '/') {
    router.push('/').then(() => {
      setTimeout(() => {
        const demoSection = document.getElementById('demo')

        if (demoSection) {
          demoSection.scrollIntoView({ behavior: 'smooth' })
        }
      }, 300)
    })
  } else {
    const demoSection = document.getElementById('demo')

    if (demoSection) {
      demoSection.scrollIntoView({ behavior: 'smooth' })
    }
  }
}
</script>
