<script lang="ts" setup>
import { useHead } from '@vueuse/head'
import { useI18n } from 'vue-i18n'
import { configs } from '~/config'

const { t } = useI18n()

useHead({
  title: `${t('name')}'s Timeline`,
})
</script>

<template>
  <div class="timeline">
    <h1 text="center xl" m="t-4" font="mono">Working In Progress.</h1>
    <v-timeline :events="configs.timeline.events" />
  </div>
</template>

<style></style>
