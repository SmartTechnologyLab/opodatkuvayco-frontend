<script setup lang="ts"></script>

<template>
  <section class="py-16 bg-gray-800">
    <div class="container mx-auto px-6">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold mb-4">Переваги <span class="text-neon-green">реєстрації</span></h2>

        <p class="text-gray-400 max-w-2xl mx-auto">
          Створіть обліковий запис та отримайте доступ до всіх можливостей сервісу
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Benefit 1 -->
        <div
          class="bg-gray-900 p-6 rounded-lg border border-gray-700 hover:border-neon-green transition-all duration-300"
        >
          <div class="mb-4 text-neon-green">
            <i class="fas fa-history text-4xl"></i>
          </div>

          <h3 class="text-xl font-semibold mb-2">Збереження історії</h3>

          <p class="text-gray-400">
            Зберігайте всі ваші розрахунки та звіти в одному місці з можливістю доступу в будь-який час.
          </p>
        </div>

        <!-- Benefit 2 -->
        <div
          class="bg-gray-900 p-6 rounded-lg border border-gray-700 hover:border-neon-green transition-all duration-300"
        >
          <div class="mb-4 text-neon-green">
            <i class="fas fa-file-export text-4xl"></i>
          </div>

          <h3 class="text-xl font-semibold mb-2">Експорт даних</h3>

          <p class="text-gray-400">Експортуйте ваші податкові розрахунки у різні формати, включаючи PDF та Excel.</p>
        </div>

        <!-- Benefit 3 -->
        <div
          class="bg-gray-900 p-6 rounded-lg border border-gray-700 hover:border-neon-green transition-all duration-300"
        >
          <div class="mb-4 text-neon-green">
            <i class="fas fa-bell text-4xl"></i>
          </div>

          <h3 class="text-xl font-semibold mb-2">Нагадування</h3>

          <p class="text-gray-400">
            Отримуйте нагадування про важливі дати подання податкової звітності та сплати податків.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss"></style>
