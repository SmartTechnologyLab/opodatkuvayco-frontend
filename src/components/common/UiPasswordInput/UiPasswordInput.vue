<script setup lang="ts">
import Password from 'primevue/password'
import { useAttrs } from 'vue'

const attrs = useAttrs()
</script>

<template>
  <Password v-bind="{ ...attrs }" />
</template>
