<script setup lang="ts">
import SelectButton from 'primevue/selectbutton'
import { useAttrs } from 'vue'

const attrs = useAttrs()
</script>

<template>
  <SelectButton v-bind="{ ...attrs }" />
</template>
