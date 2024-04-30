<script setup lang="ts">
import UiTextInput from '@/components/common/UiInput/UiInput.vue'
import UiButton from '@/components/common/UiButton/UiButton.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <form @submit.prevent class="login-form">
    <UiTextInput class="login-form__input" :placeholder="t('registration.userName')" />

    <UiTextInput type="password" class="login-form__input" :placeholder="t('registration.userPassword')" />

    <UiButton type="submit" class="login-form__btn">
      {{ t('registration.submitBtn') }}
    </UiButton>
  </form>
</template>

<style lang="scss">
.login-form {
  display: flex;
  flex-direction: column;
  gap: 2rem;

  &__input {
    background: none;
    border: 1px solid;
    border-radius: 0.5rem;
    width: 100%;
    padding: 0.8rem 1rem;
    border-radius: 0.5rem;
  }

  // ToDo: add scss variable and figure out with @use
  &__btn {
    background: none;
    color: #fff;
    border: 1px solid #fff;
    border-radius: 0.5rem;
    padding: 0.8rem;
    font-weight: 500;
  }
}
</style>
