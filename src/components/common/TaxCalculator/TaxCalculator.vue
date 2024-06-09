<script setup lang="ts">
import FileInput from '@/components/common/FileInput/FileInput.vue'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import UIButton from '@/components/common/UiButton/UiButton.vue'
import { Icons } from '@/components/common/UiButton/constants'
import { operations, validChars, values } from '@/components/common/TaxCalculator/constants/index'

const selectedFiles = ref<File[]>([])
const result = ref('')
const isNegative = ref(false)
const isCalculating = ref(false)

const { t } = useI18n()

const addToResult = (num: string | number) => {
  if (num === '+/-') {
    isNegative.value = true
  } else if (typeof num === 'number' && !isNaN(num)) {
    result.value = result.value.toString()

    result.value += isNegative.value ? '-' + num : num

    isNegative.value = false
  } else {
    result.value += num
  }
}

const reset = () => {
  result.value = ''
  isCalculating.value = false
}

const calculate = () => {
  result.value = eval(result.value) || 0
  isCalculating.value = true
}

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = target?.files
  console.log(files)
  if (files) {
    selectedFiles.value.push(...files)
  }
}

const handleDeleteFile = (file: File) => {
  selectedFiles.value = selectedFiles.value.filter((selectedFile) => selectedFile !== file)
}

const checkIsValid = (value: string) => validChars.includes(value)

const handleCheckInput = (value: string) => {
  const arrayChars = value
    .split('')
    .filter((char) => checkIsValid(char))
    .join('')

  result.value = arrayChars
}

const equalBtnType = computed(() => (selectedFiles.value.length && !result.value.length ? 'submit' : 'button'))
</script>

<template>
  <div class="calc">
    <input
      v-if="result.length || isCalculating"
      type="text"
      class="calc__result"
      v-model="result"
      @input="handleCheckInput(result)"
    />

    <FileInput @change="handleFileChange" accept=".json, .xml" v-else />

    <div class="calc__example">
      <span class="calc__example-title" v-if="!selectedFiles.length">
        {{ t('main.calc.file-example') }}
      </span>

      <ul class="calc__files-list" v-else>
        <li class="calc__file" v-for="file in selectedFiles" :key="file.lastModified">
          <span class="calc__file-name">
            {{ file.name }}
          </span>

          <UIButton :icon="Icons.CROSS" @click="handleDeleteFile(file)" class="calc__delete-btn" />
        </li>
      </ul>
      <div class="calc__toggle" />
    </div>

    <div class="calc__container">
      <div class="calc__numbers-grid">
        <UIButton v-for="value in values" :key="value" class="calc__numbers" @click="addToResult(value)">
          {{ value }}
        </UIButton>
      </div>

      <div class="calc__wrapper">
        <div class="calc__operations-grid">
          <UIButton
            v-for="operation in operations"
            @click="addToResult(operation)"
            :key="operation"
            class="calc__numbers"
          >
            {{ operation }}
          </UIButton>
        </div>

        <div class="calc__submit-grid">
          <UIButton class="calc__numbers calc__numbers--equal" @click="reset">C</UIButton>

          <UIButton class="calc__numbers calc__numbers--equal" @click="calculate" :type="equalBtnType"> = </UIButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$calc-background: $secondary-background;

$calc-text-color: $secondary-text-color;

$calc-input-background: #384648;

$toggle-background-main: #1c2022;

$toggle-background-secondary: #6691a1;

$special-btn-background: #8cd0d0;

$special-btn-background: #8cd0d0;

.calc {
  padding: 1rem;
  background: $calc-background;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 460px;

  &__container {
    display: flex;
    gap: 1rem;
    width: 100%;
  }

  &__example {
    display: flex;
    justify-content: space-between;
    align-items: start;
  }

  &__toggle {
    height: 18px;
    border: 1px solid #628c9c;
    border-radius: 18px;
    width: 4rem;
    background: linear-gradient(to right, $toggle-background-main 70%, $toggle-background-secondary 70%);
  }

  &__example-title {
    text-decoration: underline;
  }

  &__file {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    max-width: 235px;
    overflow: hidden;
  }

  &__files-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
    padding: 0;
  }

  &__file-name {
    text-decoration: underline;
    overflow: hidden;
  }

  &__result {
    outline: none;
    background: $calc-input-background;
    border: none;
    height: 60px;
    border-radius: 10px;
    padding-right: 10%;
    font-size: 20px;
    text-align: right;
  }

  &__numbers-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1rem 1rem;
    width: 100%;
    height: 15rem;
  }

  &__numbers {
    background: $main-text-color;
    color: $calc-text-color;
    border-radius: 10px;
    font-size: 18px;
    border: none;
    cursor: pointer;
    min-width: 2rem;
    max-width: 4rem;
    height: 2.8rem;
    display: flex;
    align-items: center;
    justify-content: center;

    &--equal {
      min-width: 2rem;
      max-width: 4rem;
      height: 6.9rem;

      &:nth-child(2) {
        background: $special-btn-background;
        color: $main-text-color;
      }
    }
  }

  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 63%;
  }

  &__operations-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1rem;
    height: 100%;
  }

  &__submit-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1rem;
  }

  &__result {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__delete-btn {
    background: none;
    width: 1.5rem;
  }
}
</style>
