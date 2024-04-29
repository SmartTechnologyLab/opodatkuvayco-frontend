<script setup lang="ts">
import FloatLabel from 'primevue/floatlabel'
import UiTextInput from '@/components/common/UiTextInput/UiTextInput.vue'
import UiPasswordInput from '@/components/common/UiPasswordInput/UiPasswordInput.vue'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
import UiButton from '@/components/common/UiButton/UiButton.vue'

const { t } = useI18n()
</script>

<template>
  <Suspense>
    <main>
      <div>Register page</div>
      <form>
        <FloatLabel>
          <UiTextInput id="name">{{ t('registration.userName') }}</UiTextInput>
          <label for="name">{{ t('registration.userName') }}</label>
        </FloatLabel>

        <FloatLabel>
          <UiPasswordInput id="password" />
          <label for="password">{{ t('registration.userPassword') }}</label>
        </FloatLabel>

        <UiButton type="submit">
          {{ t('registration.submitBtn') }}
        </UiButton>
      </form>
    </main>

    <!-- ToDo: add spinner for loading state -->
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>
