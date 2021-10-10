<script lang="ts" setup>
import { HeadObject, useHead } from '@vueuse/head'
import { computed, useAttrs } from 'vue'
import dayjs from 'dayjs'

interface PostProps {
  title: string
  date: string
  tags?: string[]
  meta?: HeadObject[]
}

const attrs = useAttrs()
const props = defineProps<PostProps>()

useHead({
  title: props.title,
  meta: props.meta,
})

const time = computed(() => dayjs(props.date).format('YYYY-MM-DD HH:mm'))

const enableComment = computed(() => attrs.comment ?? true)
</script>

<template>
  <div class="v-post">
    <br />
    <div class="v-post-header" p="x-5" flex="~ wrap" align="items-end">
      <h1 text="2xl md:4xl" m="r-2">
        {{ title }}
      </h1>
      <small font="normal">{{ time }}</small>
    </div>

    <hr m="t-4" />

    <div m="x-5" text="break-words">
      <div class="prose text-left">
        <slot></slot>
      </div>

      <hr m="y-4" />
      <div flex="~ wrap" justify="center" align="items-center">
        <router-link v-for="o in tags || []" :to="`/tag/${o}`" m="b-2">
          <v-tag>
            {{ o }}
          </v-tag>
        </router-link>
      </div>
      <br />

      <template v-if="enableComment">
        <v-giscus />
      </template>
    </div>
  </div>
</template>
