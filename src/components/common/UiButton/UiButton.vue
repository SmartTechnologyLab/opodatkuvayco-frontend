<script setup lang="ts">
import Button from 'primevue/button'
import { computed, useAttrs } from 'vue'
import { Icons, Severities } from './constants'

const attrs = useAttrs()

const props = defineProps<{
  icon?: Icons
  severity?: Severities
  rounded?: boolean
  outlined?: boolean
  raised?: boolean
  class?: string
}>()

defineEmits<{
  (e: 'clickBtn'): void
}>()

const routerLinkTag = 'router-link'
const linkTag = 'a'

const component = computed(() => {
  if (attrs.to) {
    return routerLinkTag
  }
  if (attrs.href) {
    return linkTag
  }

  return null
})
</script>

<template>
  <Component :is="component" v-if="component">
    <Button v-bind="{ ...props, ...attrs }" @click="$emit('clickBtn')">
      <slot />
    </Button>
  </Component>

  <Button v-bind="{ ...props, ...attrs }" @click="$emit('clickBtn')" v-else>
    <slot />
  </Button>
</template>
