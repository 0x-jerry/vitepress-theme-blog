<script lang="ts" setup>
import { useTheme } from '@@/hooks/useTheme'
import { useI18n } from '@@/lib/i18n'
import type { Component } from 'vue'
import IconHome from '~icons/carbon/home'
import IconTag from '~icons/carbon/tag'
import IconUser from '~icons/carbon/user-profile'
import LogoGithub from '~icons/logos/github-icon'
import VButton from '@@/components/VButton.vue'

const { t } = useI18n()
const theme = useTheme()

interface SidebarMenu {
  label: string
  path: string
  icon: Component
}

const menus: SidebarMenu[] = [
  {
    path: '/',
    icon: IconHome,
    label: t('menu.title.home'),
  },
  {
    path: '/tags',
    icon: IconTag,
    label: t('menu.title.tags'),
  },
  {
    path: '/about',
    icon: IconUser,
    label: t('menu.title.about'),
  },
]

const linksIconMapper = {
  github: LogoGithub,
}
</script>

<template>
  <div class="h-12 lg:h-screen">
    <div class="h-full w-8 border-(r gray-100) hidden lg:block"></div>
    <div
      class="flex items-center border-(b gray-100) gap-2 px-4 bg-gray-50 w-full lg:(h-full w-72 border-(r gray-100) flex-col px-6 pb-10 overflow-auto)"
    >
      <a href="/" class="rounded-full overflow-hidden h-2/3 md:h-4/5 lg:(h-auto w-4/5 mt-20)">
        <img
          class="transition duration-1000 rotate-0 hover:rotate-360 w-full h-full object-cover aspect-[1/1]"
          :src="theme.avatar"
        />
      </a>
      <div class="text-xl whitespace-nowrap flex-1 md:flex-none lg:(text-3xl)">
        {{ theme.name }}
      </div>
      <div
        class="hidden text-gray-400 text-xs flex-(1 shrink-10) md:(block) lg:(my-2 flex-none)"
        v-if="theme.motto"
        v-html="theme.motto"
      ></div>
      <div class="lg:mt-2">
        <a v-for="(value, key) in theme.links" :href="value" target="_blank">
          <component :is="linksIconMapper[key]"></component>
        </a>
      </div>
      <div class="lg:(block w-full)"></div>
      <div class="gap-2 hidden sm:(flex) lg:(flex-col w-full)">
        <a v-for="menu in menus" :href="menu.path">
          <VButton class="w-full">
            <component :is="menu.icon"></component>
            <span class="flex-1 hidden lg:inline-block">{{ menu.label }}</span>
          </VButton>
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped></style>
