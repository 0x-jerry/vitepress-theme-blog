<template>
  <div class="comments" ref="el"></div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
const el = ref<HTMLDivElement>()

onMounted(() => {
  if (el.value) {
    const script = createScript()
    el.value.appendChild(script)
  }
})

function createScript() {
  const script = document.createElement('script')

  script.src = 'https://giscus.0x-jerry.icu/client.js'
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
