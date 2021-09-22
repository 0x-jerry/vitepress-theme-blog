<script lang="ts" setup>
import { HeadObject, useHead } from '@vueuse/head'
import { computed } from 'vue'
import dayjs from 'dayjs'
import { useRouter } from 'vue-router'
import { ArticleInfo } from 'virtual:blog'

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

const router = useRouter()

const toc = computed(() => (router.currentRoute.value.meta.info as ArticleInfo).toc)
</script>

<template>
  <div class="v-post">
    <br />
    <div class="v-post-header" flex="~" align="items-center" p="x-5">
      <div flex="~" align="items-end">
        <h1 text="2xl md:4xl" m="r-2">
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

    <div class="prose text-left" m="x-10" text="break-words">
      <slot></slot>
    </div>
    <v-post-toc :toc="toc" class="fixed top-100px right-100px" hidden />
  </div>
</template>
