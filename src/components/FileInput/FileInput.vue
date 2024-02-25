<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineEmits(['file-selected'])
</script>

<template>
  <label class="file-input">
    <span class="file-input__download">{{ t('main.calc.file-download') }}</span>
    <input @change="$emit('file-selected')" type="file" style="display: none" />
  </label>
</template>

<style lang="scss" scoped>
$calc-input-background: #384648;

.file-input {
  outline: none;
  background: $calc-input-background;
  border: none;
  height: 60px;
  border-radius: 10px;
  font-size: 20px;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  &__download {
    text-decoration: underline;
  }
}
</style>
