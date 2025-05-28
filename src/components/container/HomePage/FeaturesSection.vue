<template>
  <section class="py-16">
    <div class="container mx-auto px-6">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold mb-4">Функціональні <span class="text-neon-green">переваги</span></h2>

        <p class="text-gray-400 max-w-2xl mx-auto">
          Чому варто обрати Оподаткувайко для розрахунку податків з інвестицій
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Feature 1 -->
        <div
          class="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-neon-green transition-all duration-300"
        >
          <div class="mb-4 text-neon-green">
            <i class="fas fa-exchange-alt text-4xl"></i>
          </div>

          <h3 class="text-xl font-semibold mb-2">Підтримка різних брокерів</h3>

          <p class="text-gray-400">
            Працюємо зі звітами Interactive Brokers та Freedom Finance, скоро додамо інших брокерів.
          </p>
        </div>
        <!-- Feature 2 -->
        <div
          class="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-neon-green transition-all duration-300"
        >
          <div class="mb-4 text-neon-green">
            <i class="fas fa-cogs text-4xl"></i>
          </div>

          <h3 class="text-xl font-semibold mb-2">Автоматизація розрахунків</h3>

          <p class="text-gray-400">
            Автоматичне визначення податкової бази та розрахунок податків згідно з українським законодавством.
          </p>
        </div>
        <!-- Feature 3 -->
        <div
          class="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-neon-green transition-all duration-300"
        >
          <div class="mb-4 text-neon-green">
            <i class="fas fa-shield-alt text-4xl"></i>
          </div>

          <h3 class="text-xl font-semibold mb-2">Безпека даних</h3>

          <p class="text-gray-400">
            Ваші фінансові дані надійно захищені. Можливість використання без збереження інформації на сервері.
          </p>
        </div>
        <!-- Feature 4 -->
        <div
          class="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-neon-green transition-all duration-300"
        >
          <div class="mb-4 text-neon-green">
            <i class="fas fa-hourglass-half text-4xl"></i>
          </div>

          <h3 class="text-xl font-semibold mb-2">Економія часу</h3>

          <p class="text-gray-400">Те, що займало години ручних розрахунків, тепер виконується за лічені хвилини.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.text-neon-green {
  color: #00ff94;
}
</style>
