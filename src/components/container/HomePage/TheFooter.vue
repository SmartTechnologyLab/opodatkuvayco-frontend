<template>
  <footer class="bg-gray-900 border-t border-gray-800 pt-12 pb-8">
    <div class="container mx-auto px-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <h3 class="text-xl font-bold text-white mb-4">Оподаткувайко</h3>

          <p class="text-gray-400 mb-4">
            Інноваційний інструмент для автоматизованого розрахунку податків з інвестиційної діяльності.
          </p>

          <!--          <div class="flex space-x-4">-->
          <!--            <a href="#" class="text-gray-400 hover:text-neon-green transition-colors duration-300 cursor-pointer">-->
          <!--              <i class="fab fa-facebook-f"></i>-->
          <!--            </a>-->

          <!--            <a href="#" class="text-gray-400 hover:text-neon-green transition-colors duration-300 cursor-pointer">-->
          <!--              <i class="fab fa-twitter"></i>-->
          <!--            </a>-->

          <!--            <a href="#" class="text-gray-400 hover:text-neon-green transition-colors duration-300 cursor-pointer">-->
          <!--              <i class="fab fa-instagram"></i>-->
          <!--            </a>-->

          <!--            <a href="#" class="text-gray-400 hover:text-neon-green transition-colors duration-300 cursor-pointer">-->
          <!--              <i class="fab fa-linkedin-in"></i>-->
          <!--            </a>-->
          <!--          </div>-->
        </div>

        <div>
          <h3 class="text-lg font-semibold text-white mb-4">Продукти</h3>

          <ul class="space-y-2">
            <li>
              <a
                href="https://docs.google.com/spreadsheets/d/1xJFAMV8DaXg4x-fgMB6LZZ6b4zJ_52HJVjFl-Vij7w0/edit?gid=0#gid=0"
                target="_blank"
                class="text-gray-400 hover:text-neon-green transition-colors duration-300 cursor-pointer"
              >
                Безкоштовна Google Таблиця
              </a>
            </li>

            <li>
              <a href="#demo" class="text-gray-400 hover:text-neon-green transition-colors duration-300 cursor-pointer">
                Онлайн-калькулятор
              </a>
            </li>

            <!--            <li>-->
            <!--              <a href="#" class="text-gray-400 hover:text-neon-green transition-colors duration-300 cursor-pointer">-->
            <!--                Преміум автоматизація-->
            <!--              </a>-->
            <!--            </li>-->

            <!--            <li>-->
            <!--              <a href="#" class="text-gray-400 hover:text-neon-green transition-colors duration-300 cursor-pointer">-->
            <!--                Корпоративні рішення-->
            <!--              </a>-->
            <!--            </li>-->
          </ul>
        </div>

        <div>
          <h3 class="text-lg font-semibold text-white mb-4">Підтримка</h3>

          <ul class="space-y-2">
            <!--            <li>-->
            <!--              <a href="#" class="text-gray-400 hover:text-neon-green transition-colors duration-300 cursor-pointer">-->
            <!--                Документація-->
            <!--              </a>-->
            <!--            </li>-->

            <!--            <li>-->
            <!--              <a href="#" class="text-gray-400 hover:text-neon-green transition-colors duration-300 cursor-pointer">-->
            <!--                Часті питання-->
            <!--              </a>-->
            <!--            </li>-->

            <li>
              <a
                href="https://web.telegram.org/a/#-1001206498039"
                @click="handleTelegramChatClick"
                class="text-gray-400 hover:text-neon-green transition-colors duration-300 cursor-pointer"
              >
                Telegram‑канал
              </a>
            </li>

            <li>
              <a
                href="https://telegra.ph/Splata-podatk%D1%96v-z-%D1%96nvestic%D1%96jnoi-d%D1%96yalnost%D1%96-fondovij-rinok-04-28"
                target="_blank"
                class="text-gray-400 hover:text-neon-green transition-colors duration-300 cursor-pointer"
              >
                Інструкція зі сплати податків
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="text-lg font-semibold text-white mb-4">Правова інформація</h3>

          <ul class="space-y-2">
            <li>
              <router-link
                to="/terms"
                class="text-gray-400 hover:text-neon-green transition-colors duration-300 cursor-pointer"
              >
                Публічна оферта
              </router-link>
            </li>

            <li>
              <router-link
                to="/policy"
                class="text-gray-400 hover:text-neon-green transition-colors duration-300 cursor-pointer"
              >
                Політика конфіденційності
              </router-link>
            </li>

            <li>
              <router-link
                to="/about"
                class="text-gray-400 hover:text-neon-green transition-colors duration-300 cursor-pointer"
              >
                Про нас
              </router-link>
            </li>
          </ul>
        </div>
      </div>

      <div class="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
        <p class="text-gray-400 text-sm mb-4 md:mb-0">© 2025 Оподаткувайко. Всі права захищені.</p>

        <!--        <div class="flex space-x-4">-->
        <!--          <span class="text-gray-400 flex items-center text-sm">-->
        <!--            <i class="fab fa-cc-visa mr-1 text-lg"></i> Visa-->
        <!--          </span>-->

        <!--          <span class="text-gray-400 flex items-center text-sm">-->
        <!--            <i class="fab fa-cc-mastercard mr-1 text-lg"></i> Mastercard-->
        <!--          </span>-->

        <!--          <span class="text-gray-400 flex items-center text-sm">-->
        <!--            <i class="fab fa-paypal mr-1 text-lg"></i> PayPal-->
        <!--          </span>-->
        <!--        </div>-->
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { handleTelegramLink } from '@/helpers/telegram'

function handleTelegramChatClick(event: Event) {
  handleTelegramLink(event, 'https://web.telegram.org/a/#-1001206498039')
}
</script>
