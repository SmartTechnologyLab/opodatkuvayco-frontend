<template>
  <div v-if="modelValue" class="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
    <div class="bg-gray-800 p-8 rounded-lg w-full max-w-md relative border border-gray-700">
      <!-- Close button -->
      <button @click="closeModal" class="absolute top-4 right-4 text-gray-400 hover:text-white">
        <i class="fas fa-times"></i> Close
      </button>
      <!-- Modal header -->
      <h2 class="text-2xl font-bold mb-6 text-white">Увійти до системи</h2>
      <!-- Login form -->
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div
          v-if="errorMessage"
          class="p-3 bg-red-500 bg-opacity-20 border border-red-500 text-red-500 rounded-md mb-4"
        >
          {{ errorMessage }}
        </div>
        <div>
          <label class="block text-gray-400 mb-2" for="email">Електронна пошта</label>
          <input
            id="email"
            type="email"
            v-model="email"
            class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:border-neon-green"
            required
          />
        </div>
        <div>
          <label class="block text-gray-400 mb-2" for="password">Пароль</label>
          <input
            id="password"
            type="password"
            v-model="password"
            class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:border-neon-green"
            required
          />
        </div>
        <div class="flex items-center justify-between">
          <label class="flex items-center">
            <input
              type="checkbox"
              v-model="rememberMe"
              class="form-checkbox bg-gray-700 border-gray-600 text-neon-green rounded"
            />
            <span class="ml-2 text-gray-400">Запам'ятати мене</span>
          </label>
          <a href="#" class="text-neon-green hover:text-neon-green-dark">Забули пароль?</a>
        </div>
        <button
          type="submit"
          :disabled="isLoading"
          class="w-full py-3 bg-neon-green text-gray-900 font-medium hover:bg-neon-green-dark transition-all duration-300 !rounded-button whitespace-nowrap relative disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <span :class="{ 'opacity-0': isLoading }">Увійти</span>
          <div v-if="isLoading" class="absolute inset-0 flex items-center justify-center">
            <svg
              class="animate-spin h-5 w-5 text-gray-900"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        </button>
      </form>
      <!-- Social login -->
      <div class="mt-6">
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-600"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-gray-800 text-gray-400">Або увійти через</span>
          </div>
        </div>
        <div class="mt-6 grid grid-cols-3 gap-3">
          <button
            class="flex justify-center items-center py-2 px-4 border border-gray-600 rounded-md hover:border-neon-green transition-colors duration-300"
          >
            <i class="fab fa-google text-gray-400"></i>
          </button>
          <button
            class="flex justify-center items-center py-2 px-4 border border-gray-600 rounded-md hover:border-neon-green transition-colors duration-300"
          >
            <i class="fab fa-facebook-f text-gray-400"></i>
          </button>
          <button
            class="flex justify-center items-center py-2 px-4 border border-gray-600 rounded-md hover:border-neon-green transition-colors duration-300"
          >
            <i class="fab fa-apple text-gray-400"></i>
          </button>
        </div>
      </div>
      <!-- Registration link -->
      <div class="mt-6 text-center text-gray-400">
        Немає акаунту?
        <button class="text-neon-green hover:text-neon-green-dark" @click="switchToRegister">Зареєструватися</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Определение props и emit событий
defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['update:modelValue', 'login', 'switch-to-register'])

// Локальные состояния

// Метод для закрытия модального окна
const closeModal = () => {
  email.value = ''
  password.value = ''
  rememberMe.value = false
  emit('update:modelValue', false)
}

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')
const validateForm = () => {
  if (!email.value) {
    errorMessage.value = 'Будь ласка, введіть електронну пошту'
    return false
  }
  if (!password.value) {
    errorMessage.value = 'Будь ласка, введіть пароль'
    return false
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    errorMessage.value = 'Будь ласка, введіть коректну електронну пошту'
    return false
  }
  return true
}
const handleLogin = async () => {
  errorMessage.value = ''
  if (!validateForm()) {
    return
  }
  isLoading.value = true
  try {
    // Імітація API запиту
    await new Promise((resolve) => setTimeout(resolve, 1500))
    // Тут має бути реальний API запит
    if (email.value === 'test@example.com' && password.value === 'password') {
      // Успішний вхід
      closeModal()
    } else {
      throw new Error('Невірний email або пароль')
    }
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Помилка при вході в систему'
  } finally {
    isLoading.value = false
  }
}

// Метод для переключения на окно регистрации
const switchToRegister = () => {
  closeModal()
  emit('switch-to-register')
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: modal-appear 0.3s ease-out;
}

@keyframes modal-appear {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid #eee;
}

.modal-header h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
}

.close-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
}

.close-button:hover {
  color: #333;
}

.modal-body {
  padding: 24px;
}

.modal-footer {
  padding: 16px 24px;
  border-top: 1px solid #eee;
  text-align: center;
}

.form-group {
  margin-bottom: 16px;
}

.form-actions {
  margin-top: 24px;
}

.error-message {
  background-color: #fed7d7;
  color: #c53030;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 16px;
}

.modal-footer a {
  color: var(--primary-color, #4299e1);
  text-decoration: none;
}

.modal-footer a:hover {
  text-decoration: underline;
}
</style>
