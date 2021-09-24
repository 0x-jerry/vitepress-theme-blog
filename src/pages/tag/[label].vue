<script lang="ts" setup>
import { useHead } from '@vueuse/head'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { blog } from '~/blog'

const route = useRoute()

const label = computed(() => route.params.label as string)

const posts = computed(() => blog.articles.filter((p) => p.tags.includes(label.value)))

const { t } = useI18n()

useHead({
  title: t('title.tag', [label.value]),
})
</script>

<template>
  <div class="v-tag-detail" m="t-4">
    <header text="center">
      <v-tag>{{ label }} | {{ posts.length }}</v-tag>
    </header>

    <v-excerpt v-for="o in posts" :info="o" p="5" m="y-5"></v-excerpt>
  </div>
</template>

<style></style>
