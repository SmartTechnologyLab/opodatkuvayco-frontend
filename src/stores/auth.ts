import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User, UserRegistrationData, UserLoginData } from '@/services/authService'
import authService from '@/services/authService'

export const useAuthStore = defineStore('auth', () => {
  // Состояние
  const currentUser = ref<User | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Геттеры
  const isAuthenticated = computed(() => !!currentUser.value)
  const userName = computed(() => currentUser.value?.name || '')

  // Действия

  // Инициализация - загрузка пользователя из локального хранилища
  const initialize = () => {
    const storedUser = authService.getCurrentUser()
    if (storedUser) {
      currentUser.value = storedUser
    }
  }

  // Регистрация нового пользователя
  const register = async (userData: UserRegistrationData) => {
    loading.value = true
    error.value = null

    try {
      const user = await authService.register(userData)
      currentUser.value = user
      authService.saveUser(user)
      return user
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Ошибка при регистрации'
      throw e
    } finally {
      loading.value = false
    }
  }

  // Вход пользователя
  const login = async (loginData: UserLoginData) => {
    loading.value = true
    error.value = null

    try {
      const user = await authService.login(loginData)
      currentUser.value = user
      authService.saveUser(user)
      return user
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Ошибка при входе'
      throw e
    } finally {
      loading.value = false
    }
  }

  // Выход пользователя
  const logout = async () => {
    loading.value = true

    try {
      await authService.logout()
      currentUser.value = null
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Ошибка при выходе'
    } finally {
      loading.value = false
    }
  }

  // Выполнить инициализацию при создании хранилища
  initialize()

  return {
    // Состояние
    currentUser,
    loading,
    error,

    // Ге��теры
    isAuthenticated,
    userName,

    // Действия
    register,
    login,
    logout
  }
})
