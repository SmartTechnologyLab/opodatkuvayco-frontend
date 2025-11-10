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
            <font-awesome-icon :icon="['fab', 'google-drive']" class="text-4xl" />
          </div>

          <h3 class="text-xl font-semibold mb-3">Google Таблиця</h3>

          <p class="text-gray-400 mb-4 flex-grow">
            Безкоштовна Google таблиця з нашим скриптом для базових розрахунків податків.
          </p>

          <ul class="mb-6 text-gray-400">
            <li class="flex items-start mb-2">
              <font-awesome-icon :icon="['fas', 'check']" class="text-neon-green mt-1 mr-2" />

              <span>Повні розрахунки</span>
            </li>

            <li class="flex items-start mb-2">
              <font-awesome-icon :icon="['fas', 'check']" class="text-neon-green mt-1 mr-2" />

              <span>Без реєстрації</span>
            </li>

            <li class="flex items-start mb-2">
              <font-awesome-icon :icon="['fas', 'check']" class="text-neon-green mt-1 mr-2" />

              <span>Ручне введення даних</span>
            </li>
          </ul>

          <a
            href="https://docs.google.com/spreadsheets/d/1xJFAMV8DaXg4x-fgMB6LZZ6b4zJ_52HJVjFl-Vij7w0/edit?gid=0#gid=0"
            target="_blank"
            class="secondary-btn btn-sm text-center"
          >
            Отримати таблицю
          </a>
        </div>
        <!-- Option 2 -->
        <div
          class="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-neon-green transition-all duration-300 h-full flex flex-col"
        >
          <div class="mb-4 text-neon-green">
            <font-awesome-icon :icon="['fas', 'calculator']" class="text-4xl" />
          </div>

          <h3 class="text-xl font-semibold mb-3">Онлайн-калькулятор</h3>

          <p class="text-gray-400 mb-4 flex-grow">
            Безкоштовний онлайн-інструмент для розрахунку податків на основі звіту брокера Freedom Finance.
          </p>

          <ul class="mb-6 text-gray-400">
            <li class="flex items-start mb-2">
              <font-awesome-icon :icon="['fas', 'check']" class="text-neon-green mt-1 mr-2" />

              <span>Потрібні розрахунки</span>
            </li>

            <li class="flex items-start mb-2">
              <font-awesome-icon :icon="['fas', 'check']" class="text-neon-green mt-1 mr-2" />

              <span>Без реєстрації</span>
            </li>

            <li class="flex items-start">
              <font-awesome-icon :icon="['fas', 'check']" class="text-neon-green mt-1 mr-2" />

              <span>Завантаження звітів</span>
            </li>
          </ul>

          <a href="#demo" class="primary-btn btn-sm text-center"> Спробувати зараз </a>
        </div>
        <!-- Option 3 -->
        <div
          class="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-neon-green transition-all duration-300 h-full flex flex-col relative overflow-hidden"
        >
          <div class="absolute top-3 right-3 bg-neon-green text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
            Скоро
          </div>

          <div class="mb-4 text-neon-green">
            <font-awesome-icon :icon="['fas', 'robot']" class="text-4xl" />
          </div>

          <h3 class="text-xl font-semibold mb-3">Преміум автоматизація</h3>

          <p class="text-gray-400 mb-4 flex-grow">
            Очікується інтеграція з Interactive Brokers та розширені можливості для професійних інвесторів.
          </p>

          <ul class="mb-6 text-gray-400">
            <li class="flex items-start mb-2">
              <font-awesome-icon :icon="['fas', 'check']" class="text-neon-green mt-1 mr-2" />

              <span>Персональний кабінет</span>
            </li>

            <li class="flex items-start mb-2">
              <font-awesome-icon :icon="['fas', 'check']" class="text-neon-green mt-1 mr-2" />

              <span>API підключення до брокерів</span>
            </li>

            <li class="flex items-start">
              <font-awesome-icon :icon="['fas', 'check']" class="text-neon-green mt-1 mr-2" />

              <span>Збереження звітів</span>
            </li>
          </ul>

          <button class="secondary-btn btn-sm" disabled>Очікується</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts"></script>
