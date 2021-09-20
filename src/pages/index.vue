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
}

const menus: Menu[] = [
  {
    icon: IconBook,
    href: '/posts',
  },
  {
    icon: IconNoteBook,
    href: '/notes',
  },
  {
    icon: IconTimeline,
    href: '/timeline',
  },
  {
    icon: IconGithub,
    href: 'https://github.com/0x-jerry',
  },
  {
    icon: IconEmail,
    href: 'mailto:x.jerry.wang@gmail.com',
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
      <div
        class="relative"
        bg="white"
        border="rounded-3xl"
        p="y-20 x-20"
        overflow="hidden"
        shadow="lg"
      >
        <v-random-image
          w="min-screen"
          h="min-screen"
          class="absolute top-1/2 left-1/2"
          transform="~ -translate-x-1/2 -translate-y-1/2"
          filter="~ blur-sm brightness-70"
          display="block"
          object="cover"
        />
        <div class="relative" z="10">
          <h1 text="4xl" p="x-10 y-5" font="mono">{{ $t('name') }}'s Blog</h1>
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
                <component :is="o.icon" />
              </VLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less"></style>

<route lang="yaml">
meta:
  layout: blank
</route>
