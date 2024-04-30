<script setup lang="ts">
import InputText from 'primevue/inputtext'
import { useAttrs } from 'vue'

const attrs = useAttrs()

const props = defineProps<{
  placeholder: string
}>()
</script>

<template>
  <InputText type="text" v-bind="{ ...attrs, ...props }" />
</template>

<style lang="scss"></style>
