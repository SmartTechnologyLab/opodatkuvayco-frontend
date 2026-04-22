<template>
  <section class="py-16 bg-gray-900 min-h-screen">
    <div class="max-w-4xl mx-auto px-6">
      <!-- Hero -->
      <header class="mb-12 text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-4 text-neon-green">Як сплатити податки з інвестицій</h1>

        <p class="text-gray-300 text-lg">
          Покрокова інструкція: від завантаження звіту брокера до подання декларації у податковому кабінеті. Слідуйте
          крокам по порядку — це займе 15-30 хвилин.
        </p>

        <p class="text-gray-400 text-sm mt-4">
          Читайте також докладну статтю:
          <a
            href="https://telegra.ph/Splata-podatk%D1%96v-z-%D1%96nvestic%D1%96jnoi-d%D1%96yalnost%D1%96-fondovij-rinok-04-28"
            target="_blank"
            rel="noopener"
            class="text-neon-green underline hover:opacity-80"
            >«Сплата податків з інвестиційної діяльності — фондовий ринок»</a
          >
        </p>
      </header>

      <!-- Disclaimer (top) -->
      <div class="mb-12 p-4 border border-gray-700 rounded-lg bg-gray-800/50">
        <p class="text-sm text-gray-400">
          <span class="text-neon-green font-semibold">Увага:</span>
          цей сервіс допомагає підготувати дані, але
          <span class="text-neon-green">не замінює податкового консультанта</span>. У складних випадках (подвійне
          оподаткування, інші джерела доходу) зверніться до фахівця. Офіційний портал ДПС:
          <a
            href="https://cabinet.tax.gov.ua"
            target="_blank"
            rel="noopener"
            class="text-neon-green underline hover:opacity-80"
            >cabinet.tax.gov.ua</a
          >.
        </p>
      </div>

      <!-- Step 1 -->
      <article class="mb-10">
        <h2 class="text-2xl font-bold text-white mb-3">
          <span class="text-neon-green">Крок 1.</span> Отримайте звіт брокера
        </h2>

        <p class="text-gray-300 mb-4">
          Завантажте річний звіт у брокера (<span class="text-neon-green">Freedom Finance</span>
          ,
          <span class="text-neon-green">Interactive Brokers</span>
          тощо). Зазвичай потрібен формат
          <span class="text-neon-green">JSON</span> або CSV за повний календарний рік.
        </p>

        <figure>
          <img
            src="/guide/step-1.png"
            alt="Місце отримання звіту у кабінеті брокера"
            class="rounded-lg border border-gray-700 w-full cursor-zoom-in hover:brightness-110 transition"
            loading="lazy"
            @error="onImgError"
            @click="openImage"
          />

          <figcaption class="text-sm text-gray-500 mt-2 text-center">Скріншот: де знайти звіт у брокера</figcaption>
        </figure>
      </article>

      <!-- Step 2 -->
      <article class="mb-10 pt-10 border-t border-gray-700">
        <h2 class="text-2xl font-bold text-white mb-3">
          <span class="text-neon-green">Крок 2.</span> Завантажте файл у Оподаткувайко
        </h2>

        <p class="text-gray-300 mb-4">
          На головній сторінці натисніть вкладку <span class="text-neon-green">«Розрахувати»</span> та завантажте JSON
          звіту. Дані обробляються локально у вашому браузері.
        </p>

        <figure>
          <img
            src="/guide/step-2.png"
            alt="Форма завантаження звіту"
            class="rounded-lg border border-gray-700 w-full cursor-zoom-in hover:brightness-110 transition"
            loading="lazy"
            @error="onImgError"
            @click="openImage"
          />

          <figcaption class="text-sm text-gray-500 mt-2 text-center">Скріншот: форма завантаження звіту</figcaption>
        </figure>
      </article>

      <!-- Step 3 -->
      <article class="mb-10 pt-10 border-t border-gray-700">
        <h2 class="text-2xl font-bold text-white mb-3">
          <span class="text-neon-green">Крок 3.</span> Перегляньте розрахунок за акціями
        </h2>

        <p class="text-gray-300 mb-4">
          Таблиця

          <span class="text-neon-green">«Акції»</span>
          показує кожну угоду: тікер, купівлю, продаж та фінансовий результат. Нижче — підсумки:
          <span class="text-neon-green">ПДФО</span>
          ,
          <span class="text-neon-green">Військовий збір</span>
          та
          <span class="text-neon-green">Загальний прибуток</span>. Зверніть увагу на дисклеймер про неоподатковуваний
          поріг.
        </p>

        <figure>
          <img
            src="/guide/step-3.png"
            alt="Таблиця розрахунку за акціями"
            class="rounded-lg border border-gray-700 w-full cursor-zoom-in hover:brightness-110 transition"
            loading="lazy"
            @error="onImgError"
            @click="openImage"
          />

          <figcaption class="text-sm text-gray-500 mt-2 text-center">Скріншот: таблиця «Акції» з підсумками</figcaption>
        </figure>
      </article>

      <!-- Step 4 -->
      <article class="mb-10 pt-10 border-t border-gray-700">
        <h2 class="text-2xl font-bold text-white mb-3">
          <span class="text-neon-green">Крок 4.</span> Перегляньте дивіденди
        </h2>

        <p class="text-gray-300 mb-4">
          Таблиця <span class="text-neon-green">«Дивіденди»</span>
          агрегує доходи по тікерах. Нижче — підсумки:
          <span class="text-neon-green">ПДФО 9%</span>

          , <span class="text-neon-green">Військовий збір</span>
          та
          <span class="text-neon-green">Загальна сума</span> (використовується у пункті 10.10 декларації).
        </p>

        <figure>
          <img
            src="/guide/step-4.png"
            alt="Таблиця дивідендів"
            class="rounded-lg border border-gray-700 w-full cursor-zoom-in hover:brightness-110 transition"
            loading="lazy"
            @error="onImgError"
            @click="openImage"
          />

          <figcaption class="text-sm text-gray-500 mt-2 text-center">Скріншот: таблиця «Дивіденди»</figcaption>
        </figure>
      </article>

      <!-- Step 5 -->
      <article class="mb-10 pt-10 border-t border-gray-700">
        <h2 class="text-2xl font-bold text-white mb-3">
          <span class="text-neon-green">Крок 5.</span> Відкрийте податковий кабінет
        </h2>

        <p class="text-gray-300 mb-4">
          Перейдіть на
          <a
            href="https://cabinet.tax.gov.ua"
            target="_blank"
            rel="noopener"
            class="text-neon-green underline hover:opacity-80"
          >
            cabinet.tax.gov.ua
          </a>
          , авторизуйтесь за допомогою КЕП та створіть
          <span class="text-neon-green">декларацію про майновий стан і доходи (F0121215)</span>.
        </p>

        <figure>
          <img
            src="/guide/step-5.png"
            alt="Створення декларації у кабінеті ДПС"
            class="rounded-lg border border-gray-700 w-full cursor-zoom-in hover:brightness-110 transition"
            loading="lazy"
            @error="onImgError"
            @click="openImage"
          />

          <figcaption class="text-sm text-gray-500 mt-2 text-center">Скріншот: створення декларації у ДПС</figcaption>
        </figure>
      </article>

      <!-- Step 6 -->
      <article class="mb-10 pt-10 border-t border-gray-700">
        <h2 class="text-2xl font-bold text-white mb-3">
          <span class="text-neon-green">Крок 6.</span> Заповніть додаток Ф1 (інвестиційний прибуток)
        </h2>

        <p class="text-gray-300 mb-4">
          У нашому сервісі натисніть <span class="text-neon-green">«Копіювати для Ф1»</span>
          (зверніть увагу на підказку
          <span class="text-neon-green">«?»</span>
          поруч з кнопкою). У кабінеті ДПС у Додатку Ф1 поставте курсор у
          <span class="text-neon-green">2-гу колонку</span>
          «Вид інвестиційних активів*» та натисніть
          <span class="text-neon-green">Ctrl+V</span> — дані автоматично розподіляться по рядках.
        </p>

        <figure>
          <img
            src="/guide/step-6.png"
            alt="Вставка даних у додаток Ф1"
            class="rounded-lg border border-gray-700 w-full cursor-zoom-in hover:brightness-110 transition"
            loading="lazy"
            @error="onImgError"
            @click="openImage"
          />

          <figcaption class="text-sm text-gray-500 mt-2 text-center">Скріншот: заповнення додатка Ф1</figcaption>
        </figure>
      </article>

      <!-- Step 7 -->
      <article class="mb-10 pt-10 border-t border-gray-700">
        <h2 class="text-2xl font-bold text-white mb-3">
          <span class="text-neon-green">Крок 7.</span> Заповніть пункт 10.10 (дивіденди)
        </h2>

        <p class="text-gray-300 mb-4">
          У нашому сервісі клікніть на суму <span class="text-neon-green">«Загальна сума дивідендів»</span> — значення
          скопіюється у буфер обміну. Вставте у поле <span class="text-neon-green">«Сума доходу»</span> рядка 10.10 в
          кабінеті ДПС. Потім окремо клікніть на <span class="text-neon-green">ПДФО</span>
          та
          <span class="text-neon-green">Військовий збір</span> і вставте у відповідні поля.
        </p>

        <figure>
          <img
            src="/guide/step-7.png"
            alt="Заповнення пункту 10.10 декларації"
            class="rounded-lg border border-gray-700 w-full cursor-zoom-in hover:brightness-110 transition"
            loading="lazy"
            @error="onImgError"
            @click="openImage"
          />

          <figcaption class="text-sm text-gray-500 mt-2 text-center">Скріншот: заповнення пункту 10.10</figcaption>
        </figure>
      </article>

      <!-- Step 8 -->
      <article class="mb-10 pt-10 border-t border-gray-700">
        <h2 class="text-2xl font-bold text-white mb-3">
          <span class="text-neon-green">Крок 8.</span> Позначте додаток Ф1
        </h2>

        <p class="text-gray-300 mb-4">
          Перед відправкою декларації у розділі
          <span class="text-neon-green">«Додатки до декларації (потрібне зазначити)»</span> обов'язково позначте
          галочкою <span class="text-neon-green">Ф1</span> — інакше кабінет не прийме дані про інвестиційний прибуток.
        </p>

        <figure>
          <img
            src="/guide/step-7a.png"
            alt="Позначте додаток Ф1"
            class="rounded-lg border border-gray-700 w-full cursor-zoom-in hover:brightness-110 transition"
            loading="lazy"
            @error="onImgError"
            @click="openImage"
          />

          <figcaption class="text-sm text-gray-500 mt-2 text-center">Скріншот: позначення Ф1 у декларації</figcaption>
        </figure>
      </article>

      <!-- Step 9 -->
      <article class="mb-10 pt-10 border-t border-gray-700">
        <h2 class="text-2xl font-bold text-white mb-3">
          <span class="text-neon-green">Крок 9.</span> Подайте декларацію
        </h2>

        <p class="text-gray-300 mb-4">
          Перевірте усі введені дані, підпишіть декларацію ключем <span class="text-neon-green">КЕП</span>
          (кваліфікований електронний підпис) та надішліть. Готово — декларацію подано!
        </p>

        <figure>
          <img
            src="/guide/step-8.png"
            alt="Підпис та надсилання декларації"
            class="rounded-lg border border-gray-700 w-full cursor-zoom-in hover:brightness-110 transition"
            loading="lazy"
            @error="onImgError"
            @click="openImage"
          />

          <figcaption class="text-sm text-gray-500 mt-2 text-center">Скріншот: підпис КЕП та подання</figcaption>
        </figure>
      </article>

      <!-- Common errors -->
      <section class="mt-12 pt-10 border-t border-gray-700">
        <h2 class="text-2xl font-bold text-white mb-4">Поширені помилки</h2>

        <article>
          <h3 class="text-xl font-semibold text-neon-green mb-3">«Not enough buy deals»</h3>

          <p class="text-gray-300 mb-4">
            Якщо бачите помилку <span class="text-neon-green">«Not enough buy deals»</span> — це означає, що у звіті
            бракує даних про <strong class="text-white">покупку</strong> акцій, які ви продавали у звітному році.
            Податкова потребує знати собівартість кожної проданої акції — а покупки могли відбутися у
            <strong class="text-white">попередніх роках</strong>.
          </p>

          <p class="text-gray-300 mb-4">Варіанти рішення:</p>

          <ul class="text-gray-300 mb-4 ml-6 list-disc space-y-2">
            <li>
              Попросіть брокера згенерувати <span class="text-neon-green">один великий звіт</span> за всі роки, коли ви
              торгували цим інструментом.
            </li>

            <li>
              Або завантажте <span class="text-neon-green">декілька звітів одночасно</span> — за поточний і попередні
              роки (форма приймає кілька файлів за раз).
            </li>
          </ul>

          <figure>
            <img
              src="/guide/error-not-enough-buy-deals.png"
              alt="Помилка «Not enough buy deals»"
              class="rounded-lg border border-gray-700 w-full cursor-zoom-in hover:brightness-110 transition"
              loading="lazy"
              @error="onImgError"
              @click="openImage"
            />

            <figcaption class="text-sm text-gray-500 mt-2 text-center">
              Скріншот: помилка в сервісі через відсутність покупок за попередні роки
            </figcaption>
          </figure>
        </article>
      </section>

      <!-- Disclaimer (bottom) -->
      <div class="mt-12 pt-10 border-t border-gray-700">
        <p class="text-sm text-gray-400">
          <span class="text-neon-green font-semibold">Нагадуємо:</span>
          Оподаткувайко допомагає автоматизувати рутинну частину розрахунку, але
          <span class="text-neon-green">не замінює податкового консультанта</span>. Для складних випадків звертайтеся до
          фахівця або пишіть нам у
          <a
            href="https://t.me/investuvayco"
            target="_blank"
            rel="noopener"
            class="text-neon-green underline hover:opacity-80"
            @click="handleTelegramClick"
            >Telegram-канал</a
          >
          . Офіційний портал ДПС:
          <a
            href="https://cabinet.tax.gov.ua"
            target="_blank"
            rel="noopener"
            class="text-neon-green underline hover:opacity-80"
            >cabinet.tax.gov.ua</a
          >.
        </p>
      </div>
    </div>

    <!-- Lightbox -->
    <div
      v-if="openedSrc"
      class="fixed inset-0 z-50 bg-black/90 flex items-center justify-center cursor-zoom-out p-4"
      @click="openedSrc = null"
    >
      <img :src="openedSrc" class="max-w-full max-h-full object-contain" alt="" />

      <button
        class="absolute top-4 right-4 text-white text-3xl leading-none w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10"
        @click.stop="openedSrc = null"
        aria-label="Закрити"
      >
        ×
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useAnalytics } from '@/composables/useAnalytics'

const { trackTelegramClick } = useAnalytics()
const openedSrc = ref<string | null>(null)

function handleTelegramClick() {
  trackTelegramClick('guide-page')
}

function openImage(event: MouseEvent) {
  const target = event.currentTarget as HTMLImageElement
  openedSrc.value = target.src
}

function onEsc(e: KeyboardEvent) {
  if (e.key === 'Escape') openedSrc.value = null
}

onMounted(() => {
  window.addEventListener('keydown', onEsc)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onEsc)
})

function onImgError(event: Event) {
  const target = event.target as HTMLImageElement
  target.style.display = 'none'
  const figcaption = target.nextElementSibling as HTMLElement | null
  if (figcaption) {
    figcaption.textContent = 'Скріншот буде додано згодом'
  }
}
</script>

<style scoped>
.text-neon-green {
  color: #00ff99;
}
</style>
