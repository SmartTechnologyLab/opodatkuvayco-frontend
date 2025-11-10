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

          <router-link
            to="/"
            class="hover:text-neon-green transition-colors duration-300 cursor-pointer"
            @click="scrollToDemo"
          >
            Demo
          </router-link>
          <!--                    <a href="#features" class="hover:text-neon-green transition-colors duration-300 cursor-pointer">Можливості</a>-->

          <!--          <a href="#calculator" class="hover:text-neon-green transition-colors duration-300 cursor-pointer">-->
          <!--            Калькулятор-->
          <!--          </a>-->

          <!--          <a href="#pricing" class="hover:text-neon-green transition-colors duration-300 cursor-pointer">Тарифи</a>-->

          <!--          <a href="#faq" class="hover:text-neon-green transition-colors duration-300 cursor-pointer">FAQ</a>-->
        </div>

        <div class="flex items-center space-x-4"></div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const router = useRouter()

function scrollToDemo(event) {
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
