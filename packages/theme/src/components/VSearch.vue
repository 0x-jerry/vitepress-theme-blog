<script lang="ts" setup>
import { useHead } from '@vueuse/head'

useHead({
  link: [
    {
      href: '/pagefind/pagefind-ui.css',
      rel: 'stylesheet',
    },
  ],
  script: [
    {
      src: '/pagefind/pagefind-ui.js',
    },
  ],
})

setTimeout(() => {
  // @ts-ignore
  new window.PagefindUI({ element: '#search', showSubResults: true })

  console.log('search functon initialized!')
}, 1000)
</script>

<template>
  <div id="search"></div>
</template>

<style lang="less" scoped></style>
