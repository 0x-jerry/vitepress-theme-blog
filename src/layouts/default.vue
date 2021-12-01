<script lang="ts" setup>
import IconBook from '~icons/mdi/book'
import IconTagText from '~icons/mdi/tag-text'
import IconTimeline from '~icons/mdi/timeline'
import IconNoteBook from '~icons/mdi/notebook'
import IconAccount from '~icons/mdi/account'
import { computed } from 'vue'
import type { Component } from 'vue'
import { useRouter } from 'vue-router'
import VGoTop from '~/components/VGoTop.vue'
import { useWindowScroll } from '@vueuse/core'
import { breakpoints } from '~/logic'

interface Menu {
  label: string
  path: string
  icon: Component
}

const menus: Menu[] = [
  {
    label: 'Posts',
    path: '/posts',
    icon: IconBook,
  },
  {
    label: 'Notes',
    path: '/notes',
    icon: IconNoteBook,
  },
  {
    label: 'Tags',
    path: '/tags',
    icon: IconTagText,
  },
  {
    label: 'Timeline',
    path: '/timeline',
    icon: IconTimeline,
  },
  {
    label: 'About me',
    path: '/about',
    icon: IconAccount,
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

const logoWidth = computed(() => (breakpoints.greater('sm').value ? 50 : 30))
</script>

<template>
  <header
    w="full"
    h="50px md:70px"
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
        <v-logo :width="logoWidth"></v-logo>
        <span m="l-2" font="mono" class="hidden md:block">{{ $t('name') }}'s Blog</span>
      </router-link>
    </div>
    <div flex="~ 1" align="items-center" justify="end">
      <v-link
        theme="text"
        v-for="o in menus"
        :key="o.path"
        :href="o.path"
        m="l-2 md:l-4"
        :disabled="isDisabled(o)"
      >
        <span flex="~ inline" align="items-center">
          <component :is="o.icon" />
          <span class="hidden md:block" m="l-1"> {{ o.label }}</span>
        </span>
      </v-link>
    </div>
  </header>
  <div w="full" h="50px md:70px"></div>
  <div w="full md:max-1200px" m="x-auto">
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
