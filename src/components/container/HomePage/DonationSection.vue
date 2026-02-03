<template>
  <!-- Donation Section -->
  <section id="donation" class="py-16 bg-gradient-to-b from-gray-900 to-gray-800">
    <div class="container mx-auto px-6">
      <div class="max-w-3xl mx-auto text-center">
        <div class="mb-6">
          <font-awesome-icon :icon="['fas', 'heart']" class="text-5xl text-neon-green" />
        </div>

        <h2 class="text-3xl font-bold mb-4">
          {{ t('donation.title').split(' ')[0] }}
          <span class="text-neon-green">{{ t('donation.title').split(' ')[1] }}</span>
        </h2>

        <p class="text-gray-400 text-lg mb-8 leading-relaxed">
          {{ t('donation.description') }}
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl mx-auto">
          <!-- Monobank -->
          <a
            href="https://send.monobank.ua/jar/YOUR_JAR_ID"
            target="_blank"
            rel="noopener noreferrer"
            class="donation-card group"
          >
            <div class="donation-icon">
              <font-awesome-icon :icon="['fas', 'piggy-bank']" class="text-3xl" />
            </div>

            <h3 class="text-lg font-semibold mb-2">{{ t('donation.monobank.title') }}</h3>

            <p class="text-gray-400 text-sm">{{ t('donation.monobank.description') }}</p>
          </a>

          <!-- Crypto -->
          <a
            href="https://YOUR_CRYPTO_DONATION_LINK"
            target="_blank"
            rel="noopener noreferrer"
            class="donation-card group"
          >
            <div class="donation-icon">
              <font-awesome-icon :icon="['fas', 'coins']" class="text-3xl" />
            </div>

            <h3 class="text-lg font-semibold mb-2">{{ t('donation.crypto.title') }}</h3>

            <p class="text-gray-400 text-sm">{{ t('donation.crypto.description') }}</p>
          </a>
        </div>

        <p class="text-gray-500 text-sm mt-8">
          <font-awesome-icon :icon="['fas', 'shield-halved']" class="mr-2" />
          {{ t('donation.footer-note') }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style scoped lang="scss">
.donation-card {
  @apply bg-gray-800 rounded-lg p-6 border border-gray-700;
  @apply transition-all duration-300;
  @apply flex flex-col items-center text-center cursor-pointer;

  &:hover {
    border-color: var(--neon-green);
  }

  .donation-icon {
    @apply w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center mb-4;
    @apply transition-all duration-300;
    color: var(--neon-green);
  }

  &:hover .donation-icon {
    background-color: var(--neon-green);
    color: #111827;
  }
}
</style>
