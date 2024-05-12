<script setup lang="ts">
import InputNumber from 'primevue/inputnumber'
import { useAttrs } from 'vue'

const attrs = useAttrs()
</script>

<template>
  <InputNumber v-bind="{ ...attrs }" />
</template>
