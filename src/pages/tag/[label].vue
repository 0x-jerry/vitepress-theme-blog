<script lang="ts" setup>
import { useHead } from '@vueuse/head'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { modules } from '@blog/excerpts/entry'

const route = useRoute()

const label = computed(() => route.params.label as string)

const posts = computed(() => modules.filter((m) => m.data.tags?.includes(label.value)))

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

    <component v-for="o in posts" :key="o.uuid" :is="o.module" p="5" m="y-5"></component>
  </div>
</template>

<style></style>
