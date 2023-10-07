<script lang="ts" setup>
import VTag from '@@/components/VTag.vue'
import VTitle from '@@/components/VTitle.vue'
import { useTheme } from '@@/hooks/useTheme'
import { useI18n } from '@@/lib/i18n'
import { computed, reactive } from 'vue'
import { data } from '@@/data/excerpts.data'
import VExcerpt from '@@/components/VExcerpt.vue'
import { useRouter } from 'vitepress'

const { t } = useI18n()
const theme = useTheme()
const router = useRouter()

const title = computed(() => t('title.tags', [theme.value.name]))

const state = reactive({
  selectedTag: getInitTag(),
})

function getInitTag() {
  if (import.meta.env.SSR) return ''
  const u = new URL(location.href)
  return u.searchParams.get('t') || ''
}

const tags = computed(() => {
  const tags: string[] = []

  data.forEach((item) => {
    tags.push(...(item.data.tags || []))
  })

  return [...new Set(tags)]
})

const artilces = computed(() => {
  if (!state.selectedTag) {
    return []
  }

  return data.filter((n) => n.data.tags?.includes(state.selectedTag))
})

function selectTag(tag: string) {
  state.selectedTag = tag
  router.go(`/tags?t=${tag}`)
}
</script>

<template>
  <div>
    <VTitle class="mb-3" :title="title" show-back></VTitle>

    <div class="flex-(~ wrap) gap-2 justify-center">
      <VTag class="cursor-pointer" @click="selectTag(tag)" v-for="tag in tags"> {{ tag }}</VTag>
    </div>
    <div class="mt-4 pt-4 border-(0 t solid gray-2) flex-(~ col) gap-2">
      <template v-for="o in artilces" :key="o.data.title">
        <VExcerpt v-bind="o.data" :href="o.url"> </VExcerpt>
      </template>
    </div>
  </div>
</template>

<style lang="less" scoped></style>
