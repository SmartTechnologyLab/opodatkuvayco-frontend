<template>
  <header class="bg-white shadow-sm">
    <!-- Navbar -->
    <nav class="border-b border-gray-800 bg-gray-900 py-4">
      <div class="container mx-auto flex items-center justify-between px-6">
        <div class="flex items-center">
          <span class="text-2xl font-bold text-neon-green">Оподаткувайко</span>
        </div>

        <div class="hidden md:flex items-center space-x-8">
          <a href="#demo" class="hover:text-neon-green transition-colors duration-300 cursor-pointer">Demo</a>
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
