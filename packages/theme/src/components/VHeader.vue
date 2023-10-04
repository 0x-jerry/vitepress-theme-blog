<script lang="ts" setup>
import IconBook from '~icons/mdi/book'
import IconTagText from '~icons/mdi/tag-text'
// import IconArchive from '~icons/mdi/archive'
import IconAccount from '~icons/mdi/account'
import IconTranslate from '~icons/mdi/translate'

import { computed } from 'vue'
import type { Component } from 'vue'
import { useRouter } from 'vitepress'
import { useWindowScroll } from '@vueuse/core'
import { useI18n } from '@@/lib/i18n'
import VLink from './VLink.vue'
import VLogo from './VLogo.vue'

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
    {
      label: t('menu.title.tags'),
      path: '/tags',
      icon: IconTagText,
    },
    // {
    //   label: t('menu.title.archive'),
    //   path: '/archives',
    //   icon: IconArchive,
    // },
    {
      label: t('menu.title.about'),
      path: '/about',
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
  <header class="v-header" :class="activeClass">
    <div class="flex flex-1">
      <v-link href="/" class="relative inline-block" theme="text">
        <div class="flex-inline items-center">
          <span class="w-30px md:w-40px">
            <v-logo></v-logo>
          </span>
          <span class="hidden lg:block ml-2"> {{ $t('name') }}'s Blog </span>
        </div>
      </v-link>
    </div>

    <div class="flex items-center justify-end">
      <v-link theme="text" v-for="(o, idx) in menus" :key="idx" :href="o.path" class="ml-2 md:ml-4"
        :disabled="isDisabled(o)">
        <span class="flex-inline items-center">
          <component :is="o.icon" />
          <span class="hidden sm:block ml-1">
            {{ o.label }}
          </span>
        </span>
      </v-link>

      <label class="flex-inline items-center ml-2 md:ml-4">
        <component :is="langConf.icon" />
        <select class="ml-1" v-model="$i18n.locale">
          <option v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" :value="locale">
            {{ t('language', '', { locale }) }}
          </option>
        </select>
      </label>
    </div>
  </header>
  <div class="w-full h-50px md:h-70px"></div>
</template>

<style lang="less" scoped>
.v-header {
  @apply transition transition-shadow z-100;

  @apply w-full h-50px px-4 flex items-center bg-white top-0 fixed;
  @apply md:h-70px md:px-10;

  box-sizing: border-box;

  &.active {
    @apply shadow-lg;
  }
}
</style>
