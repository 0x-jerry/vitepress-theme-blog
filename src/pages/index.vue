<script setup lang="ts">
import type { Component } from 'vue'
import IconGithub from '~icons/mdi/github'
import IconBook from '~icons/mdi/book'
import IconNoteBook from '~icons/mdi/notebook'
import IconEmail from '~icons/mdi/email'
import IconTimeline from '~icons/mdi/timeline'

interface Menu {
  icon: Component
  href: string
  label: string
}

const menus: Menu[] = [
  {
    icon: IconBook,
    href: '/posts',
    label: 'Posts',
  },
  {
    icon: IconNoteBook,
    href: '/notes',
    label: 'Notes',
  },
  {
    icon: IconTimeline,
    href: '/timeline',
    label: 'Timeline',
  },
  {
    icon: IconGithub,
    href: 'https://github.com/0x-jerry',
    label: 'Github',
  },
  {
    icon: IconEmail,
    href: 'mailto:x.jerry.wang@gmail.com',
    label: 'Email',
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
      bg="black opacity-30"
      text="light-900 shadow-sm"
    >
      <v-card
        class="relative"
        bg="black opacity-10"
        backdrop="~ blur-md"
        border="rounded-3xl t white opacity-40"
        p="2 md:20"
        overflow="hidden"
      >
        <div class="relative" z="10">
          <h1 text="4xl center" p="x-10 y-5" font="mono">{{ $t('name') }}'s Blog</h1>
          <br />
          <p text="center" font="mono" v-html="$t('motto')"></p>
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
              <VLink :href="o.href" theme="white">
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
