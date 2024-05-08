<script setup lang="ts">
import UiTextInput from '@/components/common/UiInput/UiInput.vue'
import UiButton from '@/components/common/UiButton/UiButton.vue'
import googleIcon from '@/assets/icons/google-icon.svg'
import { useI18n } from 'vue-i18n'
import UiImage from '@/components/common/UiImage/UiImage.vue'

const { t } = useI18n()
</script>

<template>
  <form @submit.prevent class="login-form">
    <UiTextInput class="login-form__input" :placeholder="t('registration.userName')" />

    <UiTextInput type="password" class="login-form__input" :placeholder="t('registration.userPassword')" />

    <UiButton type="submit" class="login-form__btn">
      {{ t('registration.submitBtn') }}
    </UiButton>

    <UiButton class="login-form__icon">
      <UiImage :src="googleIcon" :alt="t('registration.googleIcon')" />
    </UiButton>
  </form>
</template>

<style scoped lang="scss">
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
    background: $main-background-color;
    color: #fff;
    border-radius: 0.5rem;
    padding: 0.8rem;
    font-weight: 500;
    text-transform: uppercase;
  }

  &__icon {
    background: none;
  }
}
</style>
