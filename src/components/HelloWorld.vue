<script setup lang="ts"></script>

<template>
  <div>{{ $t('main.hello') }}</div>
  <div>{{ $t('main.dollar', { n: 2 }) }}</div>
  <div>{{ $t('main.dollar', { n: 0 }) }}</div>
  <div>{{ $t('main.dollar', { n: 100 }) }}</div>
  <p>{{ $d(new Date(), 'short', 'uk') }}</p>
  <p>{{ $d(new Date(), 'long', 'uk') }}</p>
</template>

<style scoped></style>
