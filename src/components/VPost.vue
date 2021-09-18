<script lang="ts" setup>
import { HeadObject, useHead } from '@vueuse/head'

interface PostProps {
  title?: string
  tags?: string[]
  meta: HeadObject[]
}

const props = defineProps<PostProps>()

useHead({
  title: props.title,
  meta: props.meta,
})
</script>

<template>
  <div class="v-post prose m-auto text-left">
    <slot></slot>
  </div>
</template>
