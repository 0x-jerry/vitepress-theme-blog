<script lang="ts" setup>
import { useRoute } from 'vitepress'
import { getRouteComponent } from './routes'

const route = useRoute()
</script>

<template>
  <component :is="getRouteComponent(route)"> </component>
</template>

<style lang="less"></style>
