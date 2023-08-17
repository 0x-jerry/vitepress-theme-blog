<script setup lang="ts">
import type { Component } from 'vue'
import { ref } from 'vue'
import IconGithub from '~icons/mdi/github'
import IconBook from '~icons/mdi/book'
import IconEmail from '~icons/mdi/email'
// import IconNoteBook from '~icons/mdi/notebook'
// import IconTimeline from '~icons/mdi/timeline'
import { useI18n } from '@@/lib/i18n'
import VRandomImage from '@@/components/VRandomImage.vue'
import VLink from '@@/components/VLink.vue'
import VSentence from '@@/components/VSentence.vue'

interface Menu {
  icon: Component
  href: string
  label: string
}

const { t } = useI18n()

const menus: Menu[] = [
  {
    icon: IconBook,
    href: '/',
    label: t('menu.title.posts'),
  },
  // {
  //   icon: IconNoteBook,
  //   href: '/notes',
  //   label: t('menu.title.notes'),
  // },
  // {
  //   icon: IconTimeline,
  //   href: '/timeline',
  //   label: t('menu.title.timeline'),
  // },
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
  <div w="screen" h="screen" class="relative" bg="black">
    <VRandomImage w="screen" h="screen" :id="randomImageId"></VRandomImage>
    <div class="page-bg" @click.self="updateRandomImageId" cursor="pointer">
      <div class="relative card-bg" p="2 md:x-10 md:y-14" cursor="auto">
        <div class="relative" z="10">
          <h1 text="4xl center">
            {{ $t('title.index', [$t('name')]) }}
          </h1>

          <div class="leading-7" m="y-20">
            <v-sentence>
              <p class="leading-relaxed" text="center" font="italic" v-html="$t('motto')"></p>
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
              <VLink :href="o.href" theme="white" :hidden-icon="true" flex="col">
                <div flex="~ inline" justify="center" w="full" h="40px">
                  <component :is="o.icon" />
                </div>
                <p text="sm">{{ o.label }}</p>
              </VLink>
            </li>
          </ul>
        </div>
      </div>
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
  box-shadow: 0 0 2px rgb(255, 255, 255);
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 20px;
  overflow: hidden;
  max-width: 80%;
  width: 700px;

  @apply backdrop-filter backdrop-blur-md;
}
</style>
