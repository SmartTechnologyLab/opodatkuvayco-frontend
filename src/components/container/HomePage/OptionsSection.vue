<template>
  <!-- Options Section -->
  <section id="features" class="py-16">
    <div class="container mx-auto px-6">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold mb-4">Варіанти <span class="text-neon-green">використання</span></h2>

        <p class="text-gray-400 max-w-2xl mx-auto">Оберіть найзручніший для вас спосіб роботи з нашим сервісом</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Option 1 -->
        <div
          class="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-neon-green transition-all duration-300 h-full flex flex-col"
        >
          <div class="mb-4 text-neon-green">
            <i class="fab fa-google-drive text-4xl"></i>
          </div>

          <h3 class="text-xl font-semibold mb-3">Google Таблиця</h3>

          <p class="text-gray-400 mb-4 flex-grow">
            Безкоштовна Google таблиця з нашим скриптом для базових розрахунків податків.
          </p>

          <ul class="mb-6 text-gray-400">
            <li class="flex items-start mb-2">
              <i class="fas fa-check text-neon-green mt-1 mr-2"></i>

              <span>Базові розрахунки</span>
            </li>

            <li class="flex items-start mb-2">
              <i class="fas fa-check text-neon-green mt-1 mr-2"></i>

              <span>Без реєстрації</span>
            </li>

            <li class="flex items-start">
              <i class="fas fa-check text-neon-green mt-1 mr-2"></i>

              <span>Ручне введення даних</span>
            </li>
          </ul>

          <button
            class="mt-auto px-4 py-2 border border-neon-green text-neon-green hover:bg-neon-green hover:text-gray-900 transition-colors duration-300 rounded-md cursor-pointer"
          >
            Отримати таблицю
          </button>
        </div>
        <!-- Option 2 -->
        <div
          class="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-neon-green transition-all duration-300 h-full flex flex-col"
        >
          <div class="mb-4 text-neon-green">
            <i class="fas fa-calculator text-4xl"></i>
          </div>

          <h3 class="text-xl font-semibold mb-3">Онлайн-калькулятор</h3>

          <p class="text-gray-400 mb-4 flex-grow">
            Безкоштовний онлайн-інструмент для розрахунку податків без збереження даних.
          </p>

          <ul class="mb-6 text-gray-400">
            <li class="flex items-start mb-2">
              <i class="fas fa-check text-neon-green mt-1 mr-2"></i>

              <span>Повні розрахунки</span>
            </li>

            <li class="flex items-start mb-2">
              <i class="fas fa-check text-neon-green mt-1 mr-2"></i>

              <span>Проста реєстрація</span>
            </li>

            <li class="flex items-start">
              <i class="fas fa-check text-neon-green mt-1 mr-2"></i>

              <span>Завантаження звітів</span>
            </li>
          </ul>

          <button
            class="mt-auto px-4 py-2 bg-neon-green text-gray-900 hover:bg-neon-green-dark transition-colors duration-300 rounded-md cursor-pointer"
          >
            Спробувати зараз
          </button>
        </div>
        <!-- Option 3 -->
        <div
          class="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-neon-green transition-all duration-300 h-full flex flex-col"
        >
          <div class="mb-4 text-neon-green">
            <i class="fas fa-robot text-4xl"></i>
          </div>

          <h3 class="text-xl font-semibold mb-3">Преміум автоматизація</h3>

          <p class="text-gray-400 mb-4 flex-grow">
            Повністю автоматизований розрахунок з історією та додатковими функціями.
          </p>

          <ul class="mb-6 text-gray-400">
            <li class="flex items-start mb-2">
              <i class="fas fa-check text-neon-green mt-1 mr-2"></i>

              <span>Автоматичні розрахунки</span>
            </li>

            <li class="flex items-start mb-2">
              <i class="fas fa-check text-neon-green mt-1 mr-2"></i>

              <span>Збереження історії</span>
            </li>

            <li class="flex items-start">
              <i class="fas fa-check text-neon-green mt-1 mr-2"></i>

              <span>Експорт у різні формати</span>
            </li>
          </ul>

          <button
            class="mt-auto px-4 py-2 border border-neon-green text-neon-green hover:bg-neon-green hover:text-gray-900 transition-colors duration-300 rounded-md cursor-pointer"
          >
            Дізнатись більше
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
