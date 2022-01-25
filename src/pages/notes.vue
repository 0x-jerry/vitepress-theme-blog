<script lang="ts" setup>
import { useHead } from '@vueuse/head'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

useHead({
  title: t('title.notes', [t('name')]),
})
</script>

<template>
  <div class="notes" p="y-5 x-4">
    <v-notes />
  </div>
</template>
