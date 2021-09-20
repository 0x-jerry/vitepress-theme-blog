<script lang="ts" setup>
import IconBook from '~icons/mdi/book'
import IconTag from '~icons/mdi/tag'
import IconTimeline from '~icons/mdi/timeline'
import IconNoteBook from '~icons/mdi/notebook'
import { computed } from 'vue'
import type { Component } from 'vue'
import { useRouter } from 'vue-router'
import VGoTop from '~/components/VGoTop.vue'
import { useWindowScroll } from '@vueuse/core'

interface Menu {
  label: string
  path: string
  icon: Component
}

const menus: Menu[] = [
  {
    label: 'Tags',
    path: '/tags',
    icon: IconTag,
  },
  {
    label: 'Timeline',
    path: '/timeline',
    icon: IconTimeline,
  },
  {
    label: 'Notes',
    path: '/notes',
    icon: IconNoteBook,
  },
  {
    label: 'Posts',
    path: '/posts',
    icon: IconBook,
  },
]

const router = useRouter()

function isDisabled(o: Menu) {
  return router.currentRoute.value.path === o.path
}

const top = useWindowScroll()

const activeClass = computed(() => {
  return top.y.value > 5 ? 'active' : ''
})
</script>

<template>
  <header
    w="full"
    h="70px"
    flex="~"
    align="items-center"
    transition="~ shadow"
    p="x-10"
    bg="white"
    class="header top-0 fixed"
    :class="activeClass"
    z="10"
  >
    <div flex="~">
      <router-link to="/" class="relative inline-block" flex="~" align="items-center">
        <v-logo width="40"></v-logo>
        <span m="l-2" font="mono">{{ $t('name') }}'s Blog</span>
      </router-link>
    </div>
    <div flex="~ 1" align="items-center" justify="end">
      <v-link theme="text" v-for="o in menus" :href="o.path" m="l-4" :disabled="isDisabled(o)">
        <span flex="~ inline" align="items-center">
          <component :is="o.icon" />
          <span class="ml-1"> {{ o.label }}</span>
        </span>
      </v-link>
    </div>
  </header>
  <div w="full" h="70px"></div>
  <div w="max-1200px" m="x-auto">
    <router-view />
    <br />
  </div>
  <v-go-top />
</template>

<style lang="less" scoped>
.header {
  &.active {
    @apply shadow-md;
  }
}
</style>
