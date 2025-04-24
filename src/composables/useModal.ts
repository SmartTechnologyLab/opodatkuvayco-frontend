import { ref } from 'vue'

export const useModal = () => {
  const isVisible = ref(false)

  const openModal = () => {
    isVisible.value = true
    // Добавляем класс к body для предотвращения прокрутки
    document.body.classList.add('modal-open')
  }

  const closeModal = () => {
    isVisible.value = false
    // Удаляем класс с body чтобы восстановить прокрутку
    document.body.classList.remove('modal-open')
  }

  const toggleModal = () => {
    if (isVisible.value) {
      closeModal()
    } else {
      openModal()
    }
  }

  return {
    isVisible,
    openModal,
    closeModal,
    toggleModal
  }
}
