<script lang="ts" setup>
import { useHead } from '@vueuse/head'
import { computed, onMounted, ref, useAttrs, watch } from 'vue'
import { scrollToAnchor } from '@@/utils'
import { useRoute, useRouter } from 'vitepress'
import type { TocLink } from '@@/types'
import VPostToc from '@@/components/VPostToc.vue'
import VGiscus from '@@/components/VGiscus.vue'

const attrs = useAttrs()

const router = useRouter()
const route = useRoute()

const matter = route.data.frontmatter

useHead({
  title: route.data.title,
  meta: [
    ...(matter.meta || []),
    {
      name: 'tags',
      content: matter.tags?.join(','),
    },
    {
      name: 'date',
      content: matter.date,
    },
    {
      name: 'og:title',
      content: matter.title,
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
  const headers = route.data.headers.filter((n) => n.level > 1)
  if (!headers.length) return

  const links: TocLink[] = []
  headers.forEach((head) => {
    links.push({
      id: head.slug,
      label: (head.title || '').replace(/#$/, ''),
      level: head.level,
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
        {{ route.data.title }}
      </h1>

      <div m="t-3">
        <!-- <v-post-labels v-bind="props" class="justify-center" /> -->
      </div>

      <hr m="y-4" />

      <div class="heti text-left" ref="content">
        <!-- <slot></slot> -->
        <Content></Content>
      </div>
    </div>

    <br />

    <template v-if="enableComment">
      <VGiscus />
    </template>

    <div
      v-if="toc.length"
      class="toc fixed top-100px right-10 hidden"
      w="max-260px"
      z="100"
      bg="white"
      xl="block"
    >
      <VPostToc :toc="toc" />
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
