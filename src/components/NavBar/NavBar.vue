<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import logo from '/fake-logo.png'

const { t } = useI18n()
</script>

<template>
  <nav class="nav-bar">
    <img :src="logo" :alt="$t('navBar.logo-alt')" class="nav-bar__logo" />

    <h1 class="nav-bar__title">
      {{ t('navBar.companyName') }}
    </h1>
  </nav>
</template>

<style scoped lang="scss">
@import '../../assets/scss/mixins/_headings.scss';

.nav-bar {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1rem 1.5rem;

  &__logo {
    width: 2rem;
    height: 2rem;
  }

  &__title {
    color: black;
    @include h1-mixin;
  }
}
</style>
