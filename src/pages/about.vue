<script setup lang="ts">
import type { Component } from 'vue'
import { ref } from 'vue'
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

const randomImageId = ref(1000)

function updateRandomImageId() {
  const [min, max] = [1000, 1010]

  const id = min + ~~(Math.random() * (max - min))
  randomImageId.value = id
}

updateRandomImageId()
</script>

<template>
  <div w="screen" h="screen" overflow="hidden" class="relative" bg="black">
    <v-random-image w="screen" h="screen" :id="randomImageId" />
    <div class="page-bg" @click.self="updateRandomImageId" cursor="pointer">
      <v-card class="relative card-bg" p="2 md:x-10 md:y-14" cursor="auto">
        <div class="relative" z="10">
          <h1 text="4xl center" font="mono">
            {{ $t('title.index', [$t('name')]) }}
          </h1>

          <div class="leading-7" m="y-20">
            <v-sentence>
              <p class="leading-relaxed" text="center" font="mono italic" v-html="$t('motto')"></p>
            </v-sentence>
          </div>

          <ul
            m="auto"
            flex="~ wrap"
            justify="center"
            align="items-center"
            text="2xl"
            border="rounded-md"
          >
            <li m="4" v-for="(o, idx) in menus" :key="idx">
              <VLink :href="o.href" theme="white" :hidden-icon="true">
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

<style lang="less" scoped>
.page-bg {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.1);
}

.card-bg {
  background: rgba(0, 0, 0, 0.1);
  color: white;
  text-shadow: 0 0 2px rgb(240, 240, 240);
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
  overflow: hidden;
  max-width: 80%;
  width: 700px;

  @apply backdrop-filter backdrop-blur-md;
}
</style>

<route lang="yaml">
meta:
  layout: blank
</route>
