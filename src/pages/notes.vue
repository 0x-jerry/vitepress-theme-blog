<script lang="ts" setup>
import { useHead } from '@vueuse/head'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

useHead({
  title: `${t('name')}'s Notes`,
})
</script>

<template>
  <div class="notes" p="x-4">
    <v-notes />
  </div>
</template>
