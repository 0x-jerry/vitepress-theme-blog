<script lang="ts" setup>
import { HeadObject, useHead } from '@vueuse/head'
import { computed, onMounted, ref, useAttrs, watch } from 'vue'
import dayjs from 'dayjs'
import { scrollToAnchor } from '~/utils'
import { useRouter } from 'vue-router'
import type { TocLink } from '~/types'

interface PostProps {
  title: string
  date: string
  tags?: string[]
  meta?: HeadObject[]
}

const attrs = useAttrs()
const props = defineProps<PostProps>()

const router = useRouter()

useHead({
  title: props.title,
  meta: props.meta,
})

const time = computed(() => dayjs(props.date).format('YYYY-MM-DD HH:mm'))

const enableComment = computed(() => attrs.comment ?? true)

onMounted(() => {
  if (import.meta.env.SSR) return

  // update toc
  updateToc()

  // scroll to anchor
  const hash = location.hash
  if (!hash) return
  scrollToAnchor(hash, router)
})

const content = ref<HTMLDivElement>()
const toc = ref<TocLink[]>([])

watch(
  () => router.currentRoute.value.path,
  () => {
    updateToc()
  },
)

function updateToc() {
  if (!content.value) return
  const headings = content.value.querySelectorAll('h2[id],h3[id],h4[id],h5[id]')

  const links: TocLink[] = []
  headings.forEach((heading) => {
    links.push({
      id: heading.id,
      label: (heading.textContent || '').replace(/#$/, ''),
      level: parseInt(heading.tagName.slice(1)),
    })
  })

  toc.value = links
  console.log(toc.value)
}
</script>

<template>
  <div class="v-post" p="x-4 xl:r-200px 2xl:0">
    <br />
    <div class="v-post-header" flex="~ wrap" align="items-end">
      <h1 text="2xl md:4xl" m="r-2">
        {{ title }}
      </h1>
      <small class="tag" font="normal">{{ time }}</small>
    </div>

    <hr m="t-3 b-5" />

    <div text="break-words">
      <div class="heti text-left" ref="content">
        <slot></slot>
      </div>

      <hr m="t-3 b-5" />

      <div flex="~ wrap" justify="center" align="items-center">
        <router-link v-for="o in tags || []" :key="o" :to="`/tag/${o}`" m="b-2">
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

    <div class="toc fixed top-100px right-10 hidden" w="max-260px" z="100" bg="white" xl="block">
      <v-post-toc :toc="toc" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.toc {
}

.tag {
  @apply px-2 py-1px  mr-1;
  @apply border rounded-full bg-light-400;
}
</style>
