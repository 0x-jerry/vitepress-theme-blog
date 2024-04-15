<script lang="ts" setup>
import { type Header } from 'vitepress'
import NavComp from './VArticleNav.vue'
import VLink from './VLink.vue'
import { useEventListener } from '@vueuse/core'
import { ref } from 'vue'

const props = defineProps<{
  headers: Header[]
}>()

const activeAnchor = ref<Header>()

useEventListener('scroll', () => {
  activeAnchor.value = calcTheLatestAnchor(props.headers)
})

const checkOffsetTop = 200

function calcTheLatestAnchor(headers: Header[]): Header | undefined {
  for (const header of [...headers].reverse()) {
    if (header.children.length) {
      const anchor = calcTheLatestAnchor(header.children)
      if (anchor) return anchor
    }

    const target = document.querySelector(header.link)

    const top = target?.getBoundingClientRect().top || Infinity

    if (top < checkOffsetTop) {
      return header
    }
  }
}
</script>

<template>
  <ul class="v-article-nav">
    <li v-for="header in headers" class="truncate">
      <VLink
        class="inline!"
        :href="header.link"
        theme="gray"
        :active="activeAnchor === header"
      >
        {{ header.title }}
      </VLink>
      <NavComp v-if="header.children" :headers="header.children" />
    </li>
  </ul>
</template>

<style lang="less" scoped>
li {
  margin-bottom: 4px;

  &:last-child {
    margin-bottom: 0;
  }

  ul {
    margin-top: 4px;
  }
}

ul {
  padding-left: 0;
}

li {
  ul {
    padding-left: 1rem;
  }
}
</style>
