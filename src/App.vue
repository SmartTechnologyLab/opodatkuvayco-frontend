<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld.vue'
import UIInput from './components/common/UIInput/UIInput.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div>
    <HelloWorld />

    <UIInput />
    <RouterView />
  </div>
</template>

<style scoped></style>
