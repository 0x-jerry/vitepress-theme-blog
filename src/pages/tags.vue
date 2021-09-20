<script lang="ts" setup>
import { blog } from '~/blog'
import { useHead } from '@vueuse/head'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

useHead({
  title: `${t('name')}'s Tags`,
})

const tags = blog.tags
</script>

<template>
  <div class="v-tags" flex="~ wrap" m="t-4">
    <router-link class="py-2" v-for="o in tags" :key="o.label" :to="`/tag/${o.label}`">
      <v-tag>{{ o.label }} | {{ o.count }} </v-tag>
    </router-link>
  </div>
</template>

<style></style>
