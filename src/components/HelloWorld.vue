<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'

const { t } = useI18n()

const msg = ref(t('Hello'))
</script>

<template>
  <div>{{ msg }}</div>
</template>

<style scoped></style>
