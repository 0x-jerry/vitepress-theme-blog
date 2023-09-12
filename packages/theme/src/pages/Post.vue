<script lang="ts" setup>
import { useHead } from '@vueuse/head'
import { computed, onMounted, ref, useAttrs, watch } from 'vue'
import { scrollToAnchor } from '@@/utils'
import { useRoute, useRouter } from 'vitepress'
import type { TocLink } from '@@/types'
import VPostToc from '@@/components/VPostToc.vue'
import VGiscus from '@@/components/VGiscus.vue'
import VPostLabels from '@@/components/VPostLabels.vue'

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
  <div class="v-post">
    <br />

    <div class="break-words bg-light-2 p-4 pb-6 md:p-12 md:pb-20">
      <h1 class="text-(center 2xl md:3xl) mr-2">
        {{ route.data.title }}
      </h1>

      <div class="mt-3">
        <v-post-labels v-bind="matter" class="justify-center" />
      </div>

      <hr class="my-4" />

      <div class="heti text-left m-auto" ref="content">
        <!-- <slot></slot> -->
        <Content></Content>
      </div>
    </div>

    <br />

    <template v-if="enableComment">
      <VGiscus />
    </template>

    <div v-if="toc.length" class="toc fixed top-100px right-10 hidden">
      <VPostToc :toc="toc" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.v-post {
  @apply p-(xl:r-100px 2xl:0) w-max-800px m-auto;
}

.toc {
  @apply w-max-260px z-100 bg-white xl:block;
}

.tag {
  @apply px-2 py-1px  mr-1;
  @apply border rounded-full bg-light-400;
}

hr {
  border: none;
  max-width: 42em;
  border-top: 1px solid #d6d6d6;
}
</style>

<style lang="less">
.v-post {
  div[class*='language-'] {
    width: calc(100vw - 36px);
    max-width: 1366px;
    left: 50%;
    transform: translate(-50%, 0);
  }
}
</style>
