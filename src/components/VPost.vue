<script lang="ts" setup>
import { HeadAttrs, useHead } from '@vueuse/head'
import { computed, onMounted, ref, useAttrs, watch } from 'vue'
import { scrollToAnchor } from '@/utils'
import { useRouter } from 'vitepress'
import type { TocLink } from '@/types'
import type { ReadTimeResults } from 'reading-time'

interface PostProps {
  title: string
  date: string
  tags?: string[]
  meta?: HeadAttrs[]
  read: ReadTimeResults
}

const attrs = useAttrs()
const props = defineProps<PostProps>()

const router = useRouter()

useHead({
  title: props.title,
  meta: [
    ...(props.meta || []),
    {
      name: 'tags',
      content: props.tags?.join(','),
    },
    {
      name: 'date',
      content: props.date,
    },
    {
      name: 'og:title',
      content: props.title,
    },
  ],
})

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
  () => router.route.path,
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
}
</script>

<template>
  <div class="v-post" p="xl:r-100px 2xl:0" w="max-800px" m="auto">
    <br />

    <div text="break-words" bg="light-200" p="4 b-6 md:12 md:b-20">
      <h1 text="2xl md:3xl center" m="r-2">
        {{ title }}
      </h1>

      <div m="t-3">
        <v-post-labels v-bind="props" class="justify-center" />
      </div>

      <hr m="y-4" />

      <div class="heti text-left" ref="content">
        <slot></slot>
      </div>
    </div>

    <br />

    <template v-if="enableComment">
      <v-giscus />
    </template>

    <div
      v-if="toc.length"
      class="toc fixed top-100px right-10 hidden"
      w="max-260px"
      z="100"
      bg="white"
      xl="block"
    >
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
