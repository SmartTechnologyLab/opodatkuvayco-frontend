<template>
  <!-- Registration Modal -->
  <div v-if="modelValue" class="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
    <div class="bg-gray-800 p-8 rounded-lg w-full max-w-md relative border border-gray-700">
      <!-- Close button -->
      <button @click="closeModal" class="absolute top-4 right-4 text-gray-400 hover:text-white">
        <i class="fas fa-times"></i> Close
      </button>

      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold mb-2">Реєстрація</h1>

        <p class="text-gray-400">Створіть обліковий запис для використання сервісу</p>
      </div>

      <form @submit.prevent="handleSubmit">
        <!-- Name field -->
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-400 mb-1">Ім'я</label>

          <div class="relative">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
              <i class="fas fa-user"></i>
            </span>

            <input
              type="text"
              id="name"
              v-model="formData.name"
              class="w-full bg-gray-700 border-none text-white pl-10 pr-4 py-2 rounded-md focus:ring-2 focus:ring-neon-green focus:outline-none text-sm"
              placeholder="Введіть ваше ім'я"
              required
            />
          </div>

          <p v-if="errors.name" class="mt-1 text-sm text-red-400">
            {{ errors.name }}
          </p>
        </div>

        <!-- Email field -->
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-400 mb-1">Електронна пошта</label>

          <div class="relative">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
              <i class="fas fa-envelope"></i>
            </span>

            <input
              type="email"
              id="email"
              v-model="formData.email"
              class="w-full bg-gray-700 border-none text-white pl-10 pr-4 py-2 rounded-md focus:ring-2 focus:ring-neon-green focus:outline-none text-sm"
              placeholder="example@email.com"
              required
            />
          </div>

          <p v-if="errors.email" class="mt-1 text-sm text-red-400">
            {{ errors.email }}
          </p>
        </div>

        <!-- Password field -->
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-400 mb-1">Пароль</label>

          <div class="relative">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
              <i class="fas fa-lock"></i>
            </span>

            <input
              :type="showPassword ? 'text' : 'password'"
              id="password"
              v-model="formData.password"
              class="w-full bg-gray-700 border-none text-white pl-10 pr-10 py-2 rounded-md focus:ring-2 focus:ring-neon-green focus:outline-none text-sm"
              placeholder="Мінімум 8 символів"
              required
            />

            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-white cursor-pointer"
            >
              <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </button>
          </div>

          <p v-if="errors.password" class="mt-1 text-sm text-red-400">
            {{ errors.password }}
          </p>
        </div>

        <!-- Confirm Password field -->
        <div class="mb-6">
          <label for="confirmPassword" class="block text-sm font-medium text-gray-400 mb-1">Підтвердження паролю</label>

          <div class="relative">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
              <i class="fas fa-lock"></i>
            </span>

            <input
              :type="showConfirmPassword ? 'text' : 'password'"
              id="confirmPassword"
              v-model="formData.confirmPassword"
              class="w-full bg-gray-700 border-none text-white pl-10 pr-10 py-2 rounded-md focus:ring-2 focus:ring-neon-green focus:outline-none text-sm"
              placeholder="Повторіть пароль"
              required
            />

            <button
              type="button"
              @click="showConfirmPassword = !showConfirmPassword"
              class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-white cursor-pointer"
            >
              <i :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </button>
          </div>

          <p v-if="errors.confirmPassword" class="mt-1 text-sm text-red-400">
            {{ errors.confirmPassword }}
          </p>
        </div>

        <!-- Terms and Conditions -->
        <div class="mb-6">
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input
                id="terms"
                type="checkbox"
                v-model="formData.acceptTerms"
                class="w-4 h-4 bg-gray-700 border-gray-600 rounded focus:ring-neon-green focus:ring-2 cursor-pointer"
                required
              />
            </div>

            <label for="terms" class="ml-2 text-sm text-gray-400">
              Я погоджуюсь з
              <a href="#" class="text-neon-green hover:underline cursor-pointer">умовами використання</a>
              та
              <a href="#" class="text-neon-green hover:underline cursor-pointer">політикою конфіденційності</a>
            </label>
          </div>

          <p v-if="errors.acceptTerms" class="mt-1 text-sm text-red-400">
            {{ errors.acceptTerms }}
          </p>
        </div>

        <!-- Submit button -->
        <button
          type="submit"
          class="w-full py-2 px-4 bg-neon-green text-gray-900 font-medium hover:bg-neon-green-dark transition-all duration-300 rounded-md shadow-neon !rounded-button whitespace-nowrap cursor-pointer"
        >
          Створити акаунт
        </button>
      </form>

      <!-- Social login divider -->
      <div class="flex items-center my-6">
        <div class="flex-grow h-px bg-gray-700"></div>

        <span class="px-4 text-sm text-gray-400">або</span>

        <div class="flex-grow h-px bg-gray-700"></div>
      </div>

      <!-- Social login buttons -->
      <div class="space-y-3">
        <button
          class="w-full py-2 px-4 bg-gray-700 hover:bg-gray-600 text-white flex items-center justify-center rounded-md transition-colors duration-300 !rounded-button whitespace-nowrap cursor-pointer"
        >
          <i class="fab fa-google mr-2"></i> Продовжити з Google
        </button>

        <button
          class="w-full py-2 px-4 bg-gray-700 hover:bg-gray-600 text-white flex items-center justify-center rounded-md transition-colors duration-300 !rounded-button whitespace-nowrap cursor-pointer"
        >
          <i class="fab fa-facebook-f mr-2"></i> Продовжити з Facebook
        </button>
      </div>

      <!-- Login link -->
      <div class="mt-6 text-center">
        <p class="text-gray-400 text-sm">
          Вже маєте акаунт?
          <button href="#" class="text-neon-green hover:underline cursor-pointer" @click="switchToLogin">Увійти</button>
        </p>
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

const emit = defineEmits(['update:modelValue', 'register', 'switch-to-login'])

const closeModal = () => {
  // Reset form data
  formData.value = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  }
  emit('update:modelValue', false)
}

// Метод для переключения на окно входа
const switchToLogin = () => {
  closeModal()
  emit('switch-to-login')
}

// Form data
const formData = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false
})

// Form errors
const errors = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  acceptTerms: ''
})

// Password visibility
const showPassword = ref(false)
const showConfirmPassword = ref(false)

// Toggle password visibility
const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const toggleConfirmPassword = () => {
  showConfirmPassword.value = !showConfirmPassword.value
}

// Form validation and submission
const handleSubmit = () => {
  // Reset errors
  errors.value = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: ''
  }

  // Validate name
  if (!formData.value.name.trim()) {
    errors.value.name = "Ім'я обов'язкове"
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!formData.value.email.trim()) {
    errors.value.email = "Електронна пошта обов'язкова"
  } else if (!emailRegex.test(formData.value.email)) {
    errors.value.email = 'Введіть коректну електронну пошту'
  }

  // Validate password
  if (!formData.value.password) {
    errors.value.password = "Пароль обов'язковий"
  } else if (formData.value.password.length < 8) {
    errors.value.password = 'Пароль повинен містити мінімум 8 символів'
  }

  // Validate confirm password
  if (!formData.value.confirmPassword) {
    errors.value.confirmPassword = "Підтвердження паролю обов'язкове"
  } else if (formData.value.password !== formData.value.confirmPassword) {
    errors.value.confirmPassword = 'Паролі не співпадають'
  }

  // Validate terms acceptance
  if (!formData.value.acceptTerms) {
    errors.value.acceptTerms = 'Ви повинні погодитись з умовами використання'
  }

  // Check if there are any errors
  const hasErrors = Object.values(errors.value).some((error) => error !== '')

  if (!hasErrors) {
    // Form is valid, submit it
    console.log('Form submitted:', formData.value)
    // Here you would typically make an API call to register the user
    alert('Реєстрація успішна! Перевірте вашу електронну пошту для підтвердження.')
  }
}
</script>
