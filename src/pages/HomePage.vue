<script setup lang="ts">
import TaxCalculator from '@/components/common/TaxCalculator/TaxCalculator.vue'
</script>

<template>
  <Suspense>
    <main class="main">
      <TaxCalculator />
    </main>

    <!-- ToDo: add spinner for loading state -->
    <template #fallback> Loading... </template>
  </Suspense>
</template>

<style scoped lang="scss">
.main {
  display: flex;
  justify-content: center;
  margin-inline: 2rem;
}
</style>
