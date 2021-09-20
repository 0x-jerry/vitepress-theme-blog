<script lang="ts" setup>
import { HeadObject, useHead } from '@vueuse/head'
import { computed } from 'vue'
import dayjs from 'dayjs'

interface PostProps {
  title: string
  date: string
  tags?: string[]
  meta?: HeadObject[]
}

const props = defineProps<PostProps>()

useHead({
  title: props.title,
  meta: props.meta,
})

const time = computed(() => dayjs(props.date).format('YYYY-MM-DD HH:mm'))
</script>

<template>
  <div class="v-post">
    <br />
    <div class="v-post-header" flex="~" align="items-center">
      <div flex="~" align="items-end">
        <h1 text="4xl" m="r-2">
          {{ title }}
        </h1>
        <small font="normal">{{ time }}</small>
      </div>
      <div flex="~ 1" justify="end" align="items-center">
        <router-link v-for="o in tags || []" :to="`/tag/${o}`">
          <v-tag>
            {{ o }}
          </v-tag>
        </router-link>
      </div>
    </div>
    <hr m="t-4" />
    <div class="prose m-auto text-left">
      <slot></slot>
    </div>
  </div>
</template>
