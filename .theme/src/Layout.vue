<script lang="ts" setup>
import { useRoute } from 'vitepress'
import { getRouteComponent } from './routes'
import { useTheme } from './hooks/useTheme'
import dayjs from 'dayjs'
import DefaultLayout from './layout/DefaultLayout.vue'

const route = useRoute()

const theme = useTheme()

if (theme.value.timezone) {
  dayjs.tz.setDefault(theme.value.timezone)
}
</script>

<template>
  <DefaultLayout>
    <component :is="getRouteComponent(route)"> </component>
  </DefaultLayout>
</template>

<style lang="less"></style>
