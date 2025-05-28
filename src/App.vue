<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import TheHeader from '@/components/container/HomePage/TheHeader.vue'
import TheFooter from '@/components/container/HomePage/TheFooter.vue'
import { computed, ref } from 'vue'
import { routesWithoutNavBar } from '@/router/common/routesWithoutNavBar.ts'

// Authentication state
const isAuthenticated = ref(false)
const user = ref(null)

// Modal state
const loginModalOpen = ref(false)
const registrationModalOpen = ref(false)

// Authentication methods
const openLoginModal = () => {
  loginModalOpen.value = true
}

const openRegistrationModal = () => {
  registrationModalOpen.value = true
}

const handleLogout = () => {
  isAuthenticated.value = false
  user.value = null
  // Add any additional logout logic here (e.g., clearing tokens, redirecting)
}

const route = useRoute()

const showNavBar = computed(() => !routesWithoutNavBar.includes(route.path))
const showFooter = computed(() => !routesWithoutNavBar.includes(route.path))
</script>

<template>
  <TheHeader
    v-if="showNavBar"
    :isAuthenticated="isAuthenticated"
    :user="user"
    @openLoginModal="openLoginModal"
    @openRegistrationModal="openRegistrationModal"
    @logout="handleLogout"
  />

  <RouterView />

  <TheFooter v-if="showFooter" />
</template>

<style>
/* Плавная прокрутка для всех якорных ссылок */
html {
  scroll-behavior: smooth;
}

/* Скрытые якоря с учетом высоты фиксированного хедера */
:target {
  scroll-margin-top: 80px; /* Регулируйте в зависимости от высоты вашего хедера */
}
</style>
