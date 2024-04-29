<script setup lang="ts">
import FloatLabel from 'primevue/floatlabel'
import InputText from 'primevue/inputtext'
import { useAttrs } from 'vue'

const props = defineProps<{
  inputId?: string
  labelFor?: string
}>()

const attrs = useAttrs()
</script>

<template>
  <FloatLabel>
    <InputText type="text" :id="props.inputId" v-bind="{ ...attrs }" />
    <label :for="props.labelFor">
      <slot />
    </label>
  </FloatLabel>
</template>

<style lang="scss" scopped></style>
