<script setup lang="ts">
import { ref } from 'vue'
import { useAnalytics } from '@/composables/useAnalytics'

const { trackFaqExpanded } = useAnalytics()

// FAQ items data
const faqItems = ref([
  {
    question: 'Чи можна використовувати сервіс без реєстрації?',
    answer:
      'Так, ви можете скористатися базовими функціями калькулятора без реєстрації. Однак, для збереження історії розрахунків та доступу до розширених можливостей необхідно створити обліковий запис.',
    isOpen: true
  },
  {
    question: 'Як захищені мої дані?',
    answer:
      "Ми використовуємо сучасні технології шифрування для захисту ваших даних. Вся інформація передається через захищене з'єднання SSL/TLS. Ви також можете налаштувати двофакторну аутентифікацію для додаткового захисту.",
    isOpen: false
  },
  {
    question: 'Чи можна видалити мій обліковий запис?',
    answer:
      "Так, ви можете видалити свій обліковий запис та всі пов'язані з ним дані в будь-який момент через налаштування профілю або звернувшись до нашої служби підтримки.",
    isOpen: false
  },
  {
    question: 'Які способи оплати ви приймаєте?',
    answer:
      'Ми приймаємо оплату через банківські карти (Visa, Mastercard), PayPal, а також банківським переказом для корпоративних клієнтів.',
    isOpen: false
  },
  {
    question: 'Чи можна змінити тарифний план після реєстрації?',
    answer:
      'Так, ви можете змінити свій тарифний план у будь-який момент через особистий кабінет. Зміни набудуть чинності з початку наступного розрахункового періоду.',
    isOpen: false
  }
])

// Toggle FAQ item visibility and track analytics
const toggleFaq = (index: number) => {
  const item = faqItems.value[index]
  const wasOpen = item.isOpen
  item.isOpen = !item.isOpen

  // Track when FAQ is expanded (not collapsed)
  if (!wasOpen) {
    trackFaqExpanded(item.question)
  }
}
</script>

<template>
  <section class="py-16 bg-gray-800">
    <div class="container mx-auto px-6">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold mb-4">Часті <span class="text-neon-green">запитання</span></h2>

        <p class="text-gray-400 max-w-2xl mx-auto">
          Відповіді на найпоширеніші запитання про реєстрацію та використання сервісу
        </p>
      </div>

      <div class="max-w-3xl mx-auto">
        <div class="space-y-4">
          <div v-for="(item, index) in faqItems" :key="index" class="bg-gray-900 rounded-lg border border-gray-700">
            <button
              @click="toggleFaq(index)"
              class="flex justify-between items-center w-full px-6 py-4 text-left focus:outline-none cursor-pointer"
            >
              <span class="font-medium">{{ item.question }}</span>

              <i :class="item.isOpen ? 'fas fa-chevron-up text-neon-green' : 'fas fa-chevron-down text-gray-400'"></i>
            </button>

            <div v-if="item.isOpen" class="px-6 pb-4">
              <p class="text-gray-400">{{ item.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss"></style>
