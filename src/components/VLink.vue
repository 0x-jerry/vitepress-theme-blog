<script lang="ts" setup>
import { watchEffect, reactive, computed, useAttrs } from 'vue'
import { useRouter } from 'vue-router'
import { scrollToAnchor } from '../utils'

interface VLinkProps {
  theme?: 'blue' | 'gray' | 'white' | 'text'
  href: string
  disabled?: boolean
}

const props = defineProps<VLinkProps>()
const attrs = useAttrs()

const hiddenIcon = computed(() => !!(attrs.hiddenIcon ?? 1))

const data = reactive({
  isRelative: false,
  isAnchor: false,
  isEmail: false,
  theme: '',
})

watchEffect(() => {
  data.isRelative = !/^https?/.test(props.href)
  data.isEmail = /^mailto:/.test(props.href)
  data.isAnchor = props.href.startsWith('#')
})

const router = useRouter()

function scrollToAnchorEvent(e: MouseEvent) {
  if (!data.isAnchor) return

  e.preventDefault()
  scrollToAnchor(props.href, router)
}

const url = computed(() => props.href)
</script>

<template>
  <span :class="`link ${theme} ${disabled ?? false ? 'disabled' : ''}`" :title="url">
    <a v-if="data.isAnchor || data.isEmail" :href="url" @click="scrollToAnchorEvent">
      <slot />
    </a>
    <router-link v-else-if="data.isRelative" :to="url">
      <slot />
    </router-link>
    <a v-else :href="url" target="_blank" flex="~ inline">
      <span>
        <slot />
      </span>
      <line-md-external-link-rounded v-if="!hiddenIcon" m="l-1" />
    </a>
  </span>
</template>

<style lang="less" scoped>
.link {
  @apply transition-colors;
  @apply text-blue-500 hover:text-blue-600;

  &.disabled {
    pointer-events: none;
  }

  &.gray {
    @apply text-gray-800 hover:text-blue-600;
  }

  &.white {
    @apply text-light-900 hover:text-white;
  }

  &.text {
    @apply text-gray-600 hover:text-gray-900;

    &.disabled {
      @apply text-gray-400;
    }
  }
}
</style>
