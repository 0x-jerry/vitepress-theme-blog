<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: `${t('name')}'s Blog`,
  meta: [{ name: 'description', content: 'Just a blog' }],
})
</script>

<template>
  <div class="heti--classic">
    <router-view />
  </div>
</template>
