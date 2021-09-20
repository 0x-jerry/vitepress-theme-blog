<script lang="ts" setup>
import { useHead } from '@vueuse/head'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

useHead({
  title: `${t('name')}'s Timeline`,
})
</script>

<template>
  <div text="center xl" m="t-4" font="mono">Working In Progress.</div>
</template>

<style></style>
