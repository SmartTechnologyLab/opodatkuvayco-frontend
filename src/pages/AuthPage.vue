<script setup lang="ts">
import { useSeo } from '@/composables/useSeo'
import { seoConfig } from '@/config/seo'

// SEO
useSeo(seoConfig.register)
</script>

<template>
  <Suspense>
    <div>Register page</div>

    <!-- ToDo: add spinner for loading state -->
    <template #fallback> Loading... </template>
  </Suspense>
</template>
