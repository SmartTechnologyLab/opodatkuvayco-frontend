<template>
  <header ref="headerRef" class="bg-white shadow-sm sticky top-0 z-50">
    <nav class="border-b border-gray-800 bg-gray-900 py-4 relative">
      <div class="container mx-auto flex items-center justify-between px-6">
        <div class="flex items-center">
          <router-link to="/" @click="scrollToTop" class="text-2xl font-bold text-neon-green cursor-pointer">
            Оподаткувайко
          </router-link>
        </div>

        <!-- Desktop menu -->
        <div class="hidden md:flex items-center gap-6">
          <template v-for="link in navLinks" :key="link.label">
            <router-link
              v-if="link.to"
              :to="link.to"
              class="hover:text-neon-green transition-colors duration-300 cursor-pointer flex-shrink-0"
              @click="link.onClick?.()"
            >
              {{ link.label }}
            </router-link>

            <a
              v-else
              :href="link.href"
              class="hover:text-neon-green transition-colors duration-300 cursor-pointer flex-shrink-0"
              @click.prevent="link.onClick?.()"
            >
              {{ link.label }}
            </a>
          </template>

          <button
            @click="openDonateModal"
            class="text-neon-green border border-neon-green px-3 py-1 rounded-md hover:bg-neon-green hover:text-gray-900 transition-all duration-300 text-sm"
          >
            <font-awesome-icon :icon="['fas', 'heart']" class="mr-1" />
            Підтримати
          </button>
        </div>

        <!-- Hamburger -->
        <button
          class="md:hidden text-gray-400 hover:text-white transition-colors w-min"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <font-awesome-icon :icon="['fas', mobileMenuOpen ? 'xmark' : 'bars']" class="text-xl" />
        </button>
      </div>

      <!-- Mobile menu -->
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        leave-active-class="transition-all duration-200 ease-in"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div
          v-if="mobileMenuOpen"
          class="md:hidden border-t border-gray-800 absolute left-0 right-0 top-full bg-gray-900 z-50"
        >
          <div class="container mx-auto px-6 py-4 flex flex-col space-y-4">
            <template v-for="link in navLinks" :key="link.label">
              <router-link
                v-if="link.to"
                :to="link.to"
                class="hover:text-neon-green transition-colors duration-300"
                @click="
                  () => {
                    link.onClick?.()
                    closeMobileMenu()
                  }
                "
              >
                {{ link.label }}
              </router-link>

              <a
                v-else
                :href="link.href"
                class="hover:text-neon-green transition-colors duration-300"
                @click.prevent="
                  () => {
                    link.onClick?.()
                    closeMobileMenu()
                  }
                "
              >
                {{ link.label }}
              </a>
            </template>

            <button
              @click="
                () => {
                  openDonateModal()
                  closeMobileMenu()
                }
              "
              class="text-neon-green border border-neon-green px-3 py-2 rounded-md hover:bg-neon-green hover:text-gray-900 transition-all duration-300 text-sm w-fit"
            >
              <font-awesome-icon :icon="['fas', 'heart']" class="mr-1" />
              Підтримати
            </button>
          </div>
        </div>
      </Transition>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useDonateModal } from '@/composables/useDonateModal'

const { openModal: openDonateModal } = useDonateModal()
const mobileMenuOpen = ref(false)
const headerRef = ref<HTMLElement | null>(null)
const router = useRouter()

function closeMobileMenu() {
  mobileMenuOpen.value = false
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function scrollToDemo() {
  if (router.currentRoute.value.path !== '/') {
    router.push('/').then(() => {
      setTimeout(() => {
        document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })
      }, 300)
    })
  } else {
    document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })
  }
}

const navLinks = [
  { label: 'Головна', to: '/', onClick: scrollToTop },
  { label: 'Про нас', to: '/about' },
  { label: 'Demo', href: '#demo', onClick: scrollToDemo }
]

// Close on scroll
function onScroll() {
  if (mobileMenuOpen.value) {
    closeMobileMenu()
  }
}

// Close on click outside header
function onClickOutside(event: MouseEvent) {
  if (mobileMenuOpen.value && headerRef.value && !headerRef.value.contains(event.target as Node)) {
    closeMobileMenu()
  }
}

watch(mobileMenuOpen, (isOpen) => {
  if (isOpen) {
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('click', onClickOutside)
  } else {
    window.removeEventListener('scroll', onScroll)
    document.removeEventListener('click', onClickOutside)
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  document.removeEventListener('click', onClickOutside)
})
</script>
