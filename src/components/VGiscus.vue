<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'
const el = ref<HTMLDivElement>()

const loading = ref(true)

const giscusHost = 'https://giscus.0x-jerry.icu'

onMounted(() => {
  if (el.value) {
    const script = createScript()
    el.value.appendChild(script)
  }

  window.addEventListener('message', handleGiscusMessage)
})

onUnmounted(() => {
  window.removeEventListener('message', handleGiscusMessage)
})

function handleGiscusMessage(event: MessageEvent) {
  if (event.origin !== giscusHost) return
  if (!(typeof event.data === 'object' && event.data.giscus)) return

  // const giscusData = event.data.giscus

  loading.value = false
}

function createScript() {
  const script = document.createElement('script')

  script.src = giscusHost + '/client.js'
  script.crossOrigin = 'anonymous'
  script.async = true

  script.setAttribute('data-repo', '0x-jerry/blog')
  script.setAttribute('data-repo-id', 'MDEwOlJlcG9zaXRvcnk0MDYwMjIwOTk=')
  script.setAttribute('data-category', 'General')
  script.setAttribute('data-category-id', 'DIC_kwDOGDNn084B_KvZ')
  script.setAttribute('data-mapping', 'pathname')
  script.setAttribute('data-reactions-enabled', '1')
  script.setAttribute('data-emit-metadata', '0')
  script.setAttribute('data-theme', 'preferred_color_scheme')
  return script
}
</script>

<template>
  <div class="comments" :class="{ loading }" ref="el" w="full" h="min-100px"></div>
</template>

<style lang="less" scoped>
.comments {
  &.loading {
    //
  }
}
</style>
