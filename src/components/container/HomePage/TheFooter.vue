<template>
  <footer class="bg-gray-900 border-t border-gray-800 pt-12 pb-8">
    <div class="container mx-auto px-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <h3 class="text-xl font-bold mb-4 flex items-center gap-2">
            <img :src="logoSrc" alt="" width="28" height="28" class="shrink-0" />
            <span class="flex items-baseline">
              <span class="text-white">Opodatkuv</span><span class="text-neon-green">.ayco</span>
            </span>
          </h3>

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
                href="https://t.me/investuvayco"
                @click="handleTelegramChatClick"
                class="text-gray-400 hover:text-neon-green transition-colors duration-300 cursor-pointer"
              >
                Telegram‑канал
              </a>
            </li>

            <li>
              <router-link
                to="/guide"
                class="text-gray-400 hover:text-neon-green transition-colors duration-300 cursor-pointer"
              >
                Інструкція зі сплати податків
              </router-link>
            </li>

            <li>
              <a
                href="#"
                @click.prevent="openDonateModal"
                class="text-gray-400 hover:text-neon-green transition-colors duration-300 cursor-pointer"
              >
                <font-awesome-icon :icon="['fas', 'heart']" class="mr-1" />
                Підтримати проект
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

      <div class="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-gray-400 text-sm">© 2025 Opodatkuv.ayco. Всі права захищені.</p>

        <a
          href="https://ayco.group"
          target="_blank"
          rel="noopener"
          class="group flex items-center gap-2 text-gray-500 hover:text-neon-green transition-colors duration-300 text-sm"
          aria-label="Ayco Group — материнський бренд"
        >
          <span>Частина</span>
          <img
            :src="aycoGroupLogoSrc"
            alt="Ayco Group"
            width="100"
            height="30"
            class="h-6 w-auto opacity-80 group-hover:opacity-100 transition-opacity"
          />
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { handleTelegramLink } from '@/helpers/telegram'
import { useDonateModal } from '@/composables/useDonateModal'
import { useAnalytics } from '@/composables/useAnalytics'

const { openModal: openDonateModal } = useDonateModal()
const { trackTelegramClick } = useAnalytics()

const logoSrc = '/brand/logo.svg'
const aycoGroupLogoSrc = '/brand/ayco-group-logo.svg'

function handleTelegramChatClick(event: Event) {
  trackTelegramClick('footer')
  handleTelegramLink(event, 'investuvayco')
}
</script>
