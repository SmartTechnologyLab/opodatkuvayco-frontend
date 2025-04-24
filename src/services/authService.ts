// Интерфейсы данных
export interface UserRegistrationData {
  name: string
  email: string
  password: string
  confirmPassword?: string
  acceptTerms?: boolean
}

export interface UserLoginData {
  email: string
  password: string
}

export interface User {
  id: string
  name: string
  email: string
}

// Эмуляция API для демонстрации
class AuthService {
  // Регистрация нового пользователя
  async register(userData: UserRegistrationData): Promise<User> {
    // Здесь будет обращение к реальному API
    console.log('Registering user:', userData)

    // Эмулируем задержку запроса
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Эмулируем успешный ответ
    return {
      id: `user_${Math.random().toString(36).substring(2, 9)}`,
      name: userData.name,
      email: userData.email
    }
  }

  // Вход пользователя
  async login(loginData: UserLoginData): Promise<User> {
    // Здесь будет обращение к реальному API
    console.log('Logging in user:', loginData)

    // Эмулируем задержку запроса
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Эмулируем успешный ответ
    return {
      id: `user_${Math.random().toString(36).substring(2, 9)}`,
      name: 'Демо пользователь',
      email: loginData.email
    }
  }

  // Выход пользователя
  async logout(): Promise<void> {
    // Здесь будет обращение к реальному API
    console.log('Logging out user')

    // Эмулируем задержку запроса
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Очистка локального хранилища при выходе
    localStorage.removeItem('user')
  }

  // Получение текущего пользователя из локального хранилища
  getCurrentUser(): User | null {
    const userJson = localStorage.getItem('user')
    if (userJson) {
      return JSON.parse(userJson)
    }
    return null
  }

  // Сохранение пользователя в локальное хранилище
  saveUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user))
  }
}

export default new AuthService()
