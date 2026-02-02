<script setup lang="ts">
import { useAnalytics } from '@/composables/useAnalytics'

const { trackCtaClick } = useAnalytics()

const handleCtaClick = () => {
  trackCtaClick('hero-try-free')
}
</script>

<template>
  <!-- Hero Section -->
  <section class="relative py-32 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
    <div class="absolute inset-0 bg-[url('/hero-bg.svg')] opacity-20"></div>

    <div class="container mx-auto px-6">
      <div class="max-w-4xl mx-auto text-center relative z-10">
        <h1
          class="text-5xl md:text-6xl font-bold mb-8 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300"
        >
          Автоматизований розрахунок
          <span class="text-neon-green">податків</span> з інвестицій
        </h1>

        <p class="text-gray-300 text-xl mb-12 leading-relaxed">
          Забудьте про складність ручного розрахунку податків. Наш сервіс підтримує звіти від Interactive Brokers та
          Freedom Finance, забезпечуючи точність та економію вашого часу.
        </p>

        <div class="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 max-w-sm mx-auto">
          <a href="#demo" class="primary-btn" @click="handleCtaClick"> Спробувати безкоштовно </a>
        </div>

        <!--        <div class="mt-16 grid grid-cols-3 gap-8">-->
        <!--          <div class="text-center">-->
        <!--            <div class="text-4xl font-bold text-neon-green mb-2">1000+</div>-->

        <!--            <div class="text-gray-400">Активних користувачів</div>-->
        <!--          </div>-->

        <!--          <div class="text-center">-->
        <!--            <div class="text-4xl font-bold text-neon-green mb-2">99.9%</div>-->

        <!--            <div class="text-gray-400">Точність розрахунків</div>-->
        <!--          </div>-->

        <!--          <div class="text-center">-->
        <!--            <div class="text-4xl font-bold text-neon-green mb-2">24/7</div>-->

        <!--            <div class="text-gray-400">Технічна підтримка</div>-->
        <!--          </div>-->
        <!--        </div>-->
      </div>
    </div>
  </section>
</template>
