<script lang="ts" setup>
import { computed, useAttrs } from 'vue'
import { useRoute } from 'vitepress'
import VGiscus from '@@/components/VGiscus.vue'
import VTitle from '@@/components/VTitle.vue'
import VArticleNav from '@@/components/VArticleNav.vue'

const attrs = useAttrs()

const route = useRoute()

const enableComment = computed(() => attrs.comment ?? true)

const headers = computed(() => route.data.headers)
</script>

<template>
  <div class="v-post">
    <VTitle :title="route.data.title" show-back></VTitle>

    <div class="flex">
      <div class="post-content flex-1">
        <div class="heti text-left max-w-full" ref="content">
          <Content></Content>
        </div>

        <br />

        <template v-if="enableComment">
          <ClientOnly>
            <VGiscus />
          </ClientOnly>
        </template>
      </div>
      <div class="post-nav w-0 xl:w-300px" v-if="headers.length">
        <VArticleNav
          class="sticky top-70px relative"
          :headers="headers"
        ></VArticleNav>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.v-post {
  @apply p-(xl:r-100px 2xl:0) w-max-800px m-auto;
}

.toc {
  @apply w-max-260px z-100 bg-white xl:block;
}

.tag {
  @apply px-2 py-1px  mr-1;
  @apply border rounded-full bg-light-400;
}

hr {
  border: none;
  max-width: 42em;
  border-top: 1px solid #d6d6d6;
}
</style>
