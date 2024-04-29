<script setup lang="ts">
import UiTextInput from '@/components/common/UiTextInput/UiTextInput.vue'
</script>

<template>
  <Suspense>
    <main>
      <div>Register page</div>
      <UiTextInput inputId="name" labelFor="name"> </UiTextInput>
    </main>

    <!-- ToDo: add spinner for loading state -->
    <template #fallback> Loading... </template>
  </Suspense>
</template>
