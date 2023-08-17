<script lang="ts" setup>
import IconBook from '~icons/mdi/book'
import IconTagText from '~icons/mdi/tag-text'
import IconArchive from '~icons/mdi/archive'
// import IconTimeline from '~icons/mdi/timeline'
// import IconNoteBook from '~icons/mdi/notebook'
import IconAccount from '~icons/mdi/account'
import IconTranslate from '~icons/mdi/translate'

import { computed } from 'vue'
import type { Component } from 'vue'
import { useRouter } from 'vitepress'
import { useWindowScroll } from '@vueuse/core'
import { useI18n } from '@/lib/i18n'

const { t } = useI18n()

interface Menu {
  label: string
  path: string
  icon: Component
}

const menus = computed(() => {
  const _menus: Menu[] = [
    {
      label: t('menu.title.posts'),
      path: '/',
      icon: IconBook,
    },
    // {
    //   label: t('menu.title.notes'),
    //   path: '/notes',
    //   icon: IconNoteBook,
    // },
    {
      label: t('menu.title.tags'),
      path: '/tags.html',
      icon: IconTagText,
    },
    {
      label: t('menu.title.archive'),
      path: '/archives.html',
      icon: IconArchive,
    },
    // {
    //   label: t('menu.title.timeline'),
    //   path: '/timeline',
    //   icon: IconTimeline,
    // },
    {
      label: t('menu.title.about'),
      path: '/about.html',
      icon: IconAccount,
    },
  ]

  return _menus
})

const langConf = {
  icon: IconTranslate,
}

const router = useRouter()

function isDisabled(o: Menu) {
  return router.route.path === o.path
}

const top = useWindowScroll()

const activeClass = computed(() => {
  return top.y.value > 5 ? 'active' : ''
})
</script>

<template>
  <header
    w="full"
    h="50px md:70px"
    flex="~"
    align="items-center"
    transition="~ shadow"
    p="x-4 md:x-10"
    bg="white"
    class="v-header top-0 fixed"
    :class="activeClass"
    z="100"
  >
    <div flex="~">
      <v-link href="/" class="relative inline-block" theme="text">
        <div flex="inline" align="items-center">
          <v-logo class="w-30px md:w-50px" width="50"></v-logo>
          <span m="l-2" class="hidden lg:block"> {{ $t('name') }}'s Blog </span>
        </div>
      </v-link>
    </div>

    <!-- <v-algolia></v-algolia> -->

    <div flex="~ 1" align="items-center" justify="end">
      <v-link
        theme="text"
        v-for="(o, idx) in menus"
        :key="idx"
        :href="o.path"
        m="l-2 md:l-4"
        :disabled="isDisabled(o)"
      >
        <span flex="~ inline" align="items-center">
          <component :is="o.icon" />
          <span display="hidden sm:block" m="l-1">
            {{ o.label }}
          </span>
        </span>
      </v-link>

      <label flex="~ inline" align="items-center" m="l-2 md:l-4">
        <component :is="langConf.icon" />
        <select v-model="$i18n.locale">
          <option
            v-for="locale in $i18n.availableLocales"
            :key="`locale-${locale}`"
            :value="locale"
          >
            {{ t('language', '', { locale }) }}
          </option>
        </select>
      </label>
    </div>
  </header>
  <div w="full" h="50px md:70px"></div>
</template>

<style lang="less" scoped>
.v-header {
  &.active {
    @apply shadow-lg;
  }
}
</style>
