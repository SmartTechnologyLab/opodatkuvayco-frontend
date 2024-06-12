<script setup lang="ts">
import Button from 'primevue/button'
import { computed, useAttrs } from 'vue'
import { Icons, Severities } from './constants'

defineOptions({
  inheritAttrs: false
})

const attrs = useAttrs()

const props = defineProps<{
  icon?: Icons
  severity?: Severities
  rounded?: boolean
  outlined?: boolean
  raised?: boolean
}>()

defineEmits<{
  (e: 'click'): void
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

const componentAttrs = computed(() => {
  const { href, to } = attrs

  if (component.value === 'router-link') {
    return { to }
  }

  return { href }
})
</script>

<template>
  <Component :is="component" v-if="component" v-bind="{ ...componentAttrs }">
    <Button v-bind="{ ...props, ...attrs }" @click="$emit('click')">
      <slot />
    </Button>
  </Component>

  <Button v-bind="{ ...props, ...attrs }" @click="$emit('click')" v-else>
    <slot />
  </Button>
</template>
