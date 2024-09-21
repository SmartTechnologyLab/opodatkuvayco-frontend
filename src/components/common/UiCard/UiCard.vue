<script setup lang="ts">
import Card from 'primevue/card'
</script>

<template>
  <Card class="card">
    <template #title>
      <slot name="title" />
    </template>
    <template #content>
      <slot />
    </template>
  </Card>
</template>

<style scoped lang="scss">
$card-background: $main-text-color;

.card {
  max-width: 760px;
  background: $card-background;
  color: black;
}
</style>
