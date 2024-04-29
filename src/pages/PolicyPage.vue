<script setup lang="ts"></script>

<template>
  <Suspense>
    <div>Policy page</div>

    <!-- ToDo: add spinner for loading state -->
    <template #fallback> Loading... </template>
  </Suspense>
</template>
