<script setup lang="ts">
import TaxCalculator from '@/components/common/TaxCalculator/TaxCalculator.vue'
import UiButton from '@/components/common/UiButton/UiButton.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const splitedTitle: string[] = t('main.motto').split(' ')

const firstWord = splitedTitle[0]
const restWords = splitedTitle.slice(1, 4).join(' ')
const fourthWord = splitedTitle[4]
const lastWord = splitedTitle.at(-1)
</script>

<template>
  <Suspense>
    <main class="main-page">
      <h2 class="main-page__title">
        <span class="main-page__title--marked">{{ firstWord }}</span>
        {{ restWords }}

        <span class="main-page__title--marked">{{ fourthWord }}</span>

        <br />
        {{ lastWord }}
      </h2>

      <!-- <RouterLink to="/register"> -->
      <UiButton class="main-page__btn" to="/register">
        {{ t('main.register-btn') }}
      </UiButton>
      <!-- </RouterLink> -->

      <TaxCalculator />
    </main>
    <!-- ToDo: add spinner for loading state -->
    <template #fallback> Loading... </template>
  </Suspense>
</template>

<style lang="scss">
$h2-marked-color: #6af6ff;
$register-btn-color: #8cd0d0;

.main-page {
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-inline: 2rem;

  &__title {
    text-align: center;
    font-weight: bold;
    font-size: 1.8rem;
    margin-block: 0.5rem 0.5rem;

    &--marked {
      color: $h2-marked-color;
      font-weight: bold;
    }
  }

  &__btn {
    margin-block: 2rem;
    padding: 0.5rem;
    background: $register-btn-color;
    color: $main-text-color;
    font-size: 1.2rem;
  }
}
</style>
