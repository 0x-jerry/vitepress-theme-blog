<script lang="ts" setup>
import 'heti'
import { useHead } from '@vueuse/head'
import { useI18n } from './lib/i18n'
import { useTheme } from './hooks/useTheme'
import { useRoute } from 'vitepress'
import { getRouteComponent } from './routes'

const { t } = useI18n()
const theme = useTheme()

useHead({
  title: t('title.index', [theme.value.name]),
})

const route = useRoute()
</script>

<template>
  <component :is="getRouteComponent(route)"> </component>
</template>

<style lang="less"></style>
