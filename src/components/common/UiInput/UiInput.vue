<script setup lang="ts">
import InputText from 'primevue/inputtext'
import { useAttrs } from 'vue'

const attrs = useAttrs()
</script>

<template>
  <InputText type="text" v-bind="{ ...attrs }" />
</template>
