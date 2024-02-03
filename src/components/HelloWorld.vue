<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'

const { t } = useI18n()

const dollarsCount = ref(100)

const hundredDollarMessage = ref(t('Dollar', dollarsCount.value))

const oneDollarMessage = ref(t('Dollar', dollarsCount.value - 99))

const msg = ref(t('Hello'))
</script>

<template>
  <div>{{ msg }}</div>
  <div>{{ hundredDollarMessage }}</div>
  <div>{{ oneDollarMessage }}</div>
</template>

<style scoped></style>
