<script setup lang="ts">
import FileInput from '@/components/common/FileInput/FileInput.vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import UIButton from '@/components/common/UiButton/UiButton.vue'
import { Icons } from '@/components/common/UiButton/constants'
import { validChars } from './constants'

const selectedFiles = ref<File[]>([])
const numbers = ref<Array<number | string>>([1, 2, 3, 4, 5, 6, 7, 8, 9, '+/-', 0, '.'])
const result = ref<string>('')
const operations = ref<string[]>(['*', '/', '+', '-'])
const isNegative = ref<boolean>(false)
const isCalculating = ref<boolean>(false)

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

    <template v-else>
      <FileInput @change="handleFileChange" />
    </template>

    <div class="calc__example">
      <span class="calc__example-title" v-if="!selectedFiles.length">
        {{ t('main.calc.file-example') }}
      </span>

      <ul v-else class="calc__files-list">
        <li class="calc__file" v-for="file in selectedFiles" :key="file.lastModified">
          <span class="calc__file-name">
            {{ file.name?.slice(0, 12) + '...' }}
          </span>

          <UIButton :icon="Icons.CROSS" @click="handleDeleteFile(file)" />
        </li>
      </ul>
      <div class="calc__toggle" />
    </div>

    <div class="calc__container">
      <div class="calc__numbers-grid">
        <button v-for="num in numbers" :key="num" class="calc__numbers" @click="addToResult(num)">
          {{ num }}
        </button>
      </div>

      <div class="calc__wrapper">
        <div class="calc__operations-grid">
          <button
            v-for="operation in operations"
            @click="addToResult(operation)"
            :key="operation"
            class="calc__numbers"
          >
            {{ operation }}
          </button>
        </div>

        <div class="calc__submit-grid">
          <button class="calc__numbers calc__numbers--equal" @click="reset">C</button>

          <button
            class="calc__numbers calc__numbers--equal"
            @click="calculate"
            :type="selectedFiles.length && !result.length ? 'submit' : 'button'"
          >
            =
          </button>
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

$equal-background: #8cd0d0;

.calc {
  padding: 1rem;
  background: $calc-background;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 60%;
  max-width: 720px;

  &__container {
    display: flex;
    gap: 6%;
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
    width: 20%;
    background: linear-gradient(to right, $toggle-background-main 70%, $toggle-background-secondary 70%);
  }

  &__example-title {
    text-decoration: underline;
  }

  &__file {
    display: flex;
    align-items: center;
    gap: 0.3rem;
  }

  &__files-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
  }

  &__file-delete {
    background: $equal-background;
    height: 14px;
    width: 14px;
  }

  &__file-name {
    text-decoration: underline;
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
    grid-gap: 8% 10%;
    width: 100%;
    height: 15em;
  }

  &__numbers {
    background: $main-text-color;
    color: $calc-text-color;
    border-radius: 10px;
    font-size: 18px;
    border: none;
    cursor: pointer;
    width: 100%;
    height: 100%;

    &--equal {
      width: 43%;
      height: 100%;

      &:nth-child(2) {
        background: $equal-background;
        color: $main-text-color;
      }
    }
  }

  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: 10%;
    width: 63%;
  }

  &__operations-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 19% 13%;
    height: 100%;
  }

  &__submit-grid {
    height: 100%;
    display: flex;
    gap: 13%;
  }

  &__result {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
