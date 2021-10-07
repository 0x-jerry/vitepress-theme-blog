<script setup lang="ts">
import type { Component } from 'vue'
import IconGithub from '~icons/mdi/github'
import IconBook from '~icons/mdi/book'
import IconNoteBook from '~icons/mdi/notebook'
import IconEmail from '~icons/mdi/email'
import IconTimeline from '~icons/mdi/timeline'
import { useI18n } from 'vue-i18n'

interface Menu {
  icon: Component
  href: string
  label: string
}

const { t } = useI18n()

const menus: Menu[] = [
  {
    icon: IconBook,
    href: '/posts',
    label: t('menu.title.posts'),
  },
  {
    icon: IconNoteBook,
    href: '/notes',
    label: t('menu.title.notes'),
  },
  {
    icon: IconTimeline,
    href: '/timeline',
    label: t('menu.title.timeline'),
  },
  {
    icon: IconGithub,
    href: 'https://github.com/0x-jerry',
    label: t('menu.title.github'),
  },
  {
    icon: IconEmail,
    href: 'mailto:x.jerry.wang@gmail.com',
    label: t('menu.title.email'),
  },
]
</script>

<template>
  <div w="screen" h="screen" overflow="hidden" class="relative" bg="black">
    <v-random-image w="screen" h="screen" />
    <div
      class="absolute top-0 left-0"
      h="screen"
      w="screen"
      z="10"
      display="flex"
      justify="center"
      align="items-center"
      bg="black opacity-10"
    >
      <v-card
        class="relative"
        bg="black opacity-30"
        text="white shadow-sm"
        backdrop="~ blur-md"
        border="rounded-3xl t white opacity-40"
        p="2 md:20"
        overflow="hidden"
        shadow="md md:lg"
      >
        <div class="relative" z="10">
          <h1 text="4xl center" p="x-10 y-5" font="mono">{{ $t('title.index', [$t('name')]) }}</h1>
          <br />
          <v-sentence>
            <p class="leading-relaxed" text="center" font="mono italic" v-html="$t('motto')"></p>
          </v-sentence>
          <br />
          <ul
            w="min-content"
            m="auto"
            display="flex"
            justify="center"
            align="items-center"
            text="2xl"
            p="y-3 x-5"
            border="rounded-md"
          >
            <li class="mx-5" v-for="o in menus">
              <VLink :href="o.href" theme="white" hidden-icon>
                <div flex="~ inline" justify="center" w="full">
                  <component :is="o.icon" />
                </div>
                <p text="sm">{{ o.label }}</p>
              </VLink>
            </li>
          </ul>
        </div>
      </v-card>
    </div>
  </div>
</template>

<style lang="less"></style>

<route lang="yaml">
meta:
  layout: blank
</route>
