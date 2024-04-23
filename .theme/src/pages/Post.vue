<script lang="ts" setup>
import { computed, useAttrs } from 'vue'
import { useRoute } from 'vitepress'
import VGiscus from '@@/components/VGiscus.vue'
import VTitle from '@@/components/VTitle.vue'
import VArticleNav from '@@/components/VArticleNav.vue'
import { useWindowScroll } from '@vueuse/core'
import { toFixed } from '@0x-jerry/utils'

const attrs = useAttrs()

const route = useRoute()

const enableComment = computed(() => attrs.comment ?? true)

const headers = computed(() => route.data.headers)

const { y } = useWindowScroll()

const percentage = computed(() => {
  if (import.meta.env.SSR) return 0

  const h = (document.documentElement.scrollHeight || 0) - window.innerHeight
  return toFixed((y.value / h) * 100, 2) + '%'
})
</script>

<template>
  <div class="v-post">
    <VTitle :title="route.data.title" show-back></VTitle>

    <div class="flex">
      <div class="post-content flex-1 w-0 px-1">
        <div class="heti text-left max-w-full" ref="content">
          <Content></Content>
        </div>

        <br />

        <ClientOnly>
          <VGiscus v-if="enableComment" />
        </ClientOnly>
      </div>
      <div class="post-nav" v-if="headers.length">
        <ClientOnly>
          <VArticleNav :headers="headers" />
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.post-nav {
  @apply w-300px hidden xl:block;

  position: fixed;
  top: 50%;
  transform: translate(720px, -50%);
  padding-left: 1rem;

  &::before,
  &::after {
    content: '';
    position: absolute;
    left: -1px;
    top: 0;

    width: 1px;
    height: 100%;
    @apply bg-bGray-2;
  }

  &::after {
    z-index: 1;
    height: v-bind('percentage');
    @apply bg-bPrimary;
  }
}

.toc {
  @apply w-max-260px z-100 bg-white xl:block;
}

.tag {
  @apply px-2 py-1px mr-1;
  @apply border rounded-full bg-light-400;
}

hr {
  border: none;
  max-width: 42em;
  border-top: 1px solid #d6d6d6;
}
</style>
