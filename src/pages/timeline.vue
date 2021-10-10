<script lang="ts" setup>
import { useHead } from '@vueuse/head'
import { useI18n } from 'vue-i18n'
import { components } from '~blog/events'

const { t } = useI18n()

useHead({
  title: t('title.timeline', [t('name')]),
})
</script>

<template>
  <div class="timeline" p="l-5">
    <h1 text="center xl" m="t-4" font="mono">{{ $t('WIP') }}</h1>
    <component v-for="o in components" :is="o"></component>
  </div>
</template>

<style></style>
