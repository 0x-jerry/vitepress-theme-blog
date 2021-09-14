<script lang="ts" setup>
import { watchEffect, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { scrollToAnchor } from '../utils'

interface VLinkProps {
  theme?: 'blue' | 'gray'
  href: string
}

const props = defineProps<VLinkProps>()

const data = reactive({
  isRelative: false,
  isAnchor: false,
  theme: '',
})

watchEffect(() => {
  data.isRelative = !/^https?/.test(props.href)
  data.isAnchor = props.href.startsWith('#')
})

const router = useRouter()

function scrollToAnchorEvent(e: MouseEvent) {
  e.preventDefault()
  scrollToAnchor(props.href, router)
}

const url = computed(() => encodeURI(props.href))
</script>

<template>
  <span class="link" :class="theme">
    <a v-if="data.isAnchor" :href="url" @click="scrollToAnchorEvent">
      <slot />
    </a>
    <router-link v-else-if="data.isRelative" :to="url">
      <slot />
    </router-link>
    <a v-else :href="url" target="_blank">
      <span>
        <slot />
      </span>
      <line-md-external-link-rounded />
    </a>
  </span>
</template>

<style lang="less" scoped>
.link {
  @apply transition-colors;
  @apply text-blue-500 hover:text-blue-600;

  &.gray {
    @apply text-gray-800 hover:text-blue-600;
  }
}
</style>
