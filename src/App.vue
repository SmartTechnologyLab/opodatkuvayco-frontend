<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import NavBar from '@/components/NavBar/NavBar.vue'
import { computed } from 'vue'
import { Routes } from './router/common'

const route = useRoute()

const showNavBar = computed(() => (route.path === Routes.REGISTER_PAGE ? false : true))
</script>

<template>
  <NavBar v-if="showNavBar" />
  <RouterView />
</template>

<style scoped lang="scss"></style>
