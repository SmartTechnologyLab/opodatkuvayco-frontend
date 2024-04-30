<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar/NavBar.vue'
import { Routes } from '@/router/routes'
</script>

<template>
  <NavBar v-if="$route.path !== Routes.REGISTER_PAGE" />
  <RouterView />
</template>

<style scoped lang="scss"></style>
