<template>
  <section class="py-20 bg-gray-900">
    <div class="container mx-auto px-6">
      <div class="max-w-2xl mx-auto text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-8 text-neon-green">Про нас</h1>

        <p class="text-gray-200 text-lg mb-6">
          Ми — команда Українців, які створюють сервіс
          <span class="text-neon-green font-semibold">Оподаткувайко</span> для українців.
        </p>

        <p class="text-gray-400 text-base mb-6">
          Наша мета — зробити розрахунок податків з інвестицій простим, швидким і доступним для кожного. Ми постійно
          працюємо над новими корисними функціями, щоб допомогти вам краще керувати своїми фінансами.
        </p>

        <p class="text-gray-400 text-base mb-6">
          Попереду багато цікавого: автоматичне формування звітів, інтеграції з брокерами, калькулятори, поради та ще
          більше можливостей для інвесторів.
        </p>

        <p class="text-gray-400 text-base mb-8">
          Підтримайте наш проєкт — розповідайте про нас друзям, підписуйтесь на наш
          <a href="https://t.me/investuvayco" @click="handleTelegramClick" class="text-neon-green underline"
            >Telegram-канал</a
          <a href="https://t.me/investuvayco" 
            @click="handleTelegramClick" 
            class="text-neon-green underline"
          >
            Telegram-канал
          </a>
          та слідкуйте за оновленнями!
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { handleTelegramLink } from '@/helpers/telegram'

function handleTelegramClick(event: Event) {
  handleTelegramLink(event, 'investuvayco')
}
</script>

<style scoped>
.text-neon-green {
  color: #00ff99;
}
</style>
