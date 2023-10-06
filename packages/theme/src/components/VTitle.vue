<script lang="ts" setup>
import { useHead } from '@vueuse/head'
import { useRouter } from 'vitepress'
import ArrowLeft from '~icons/carbon/arrow-left'

const props = defineProps<{
  title: string
  showBack?: boolean
}>()

const router = useRouter()

function back() {
  router.go('/')
}

useHead({
  title: props.title,
})
</script>

<template>
  <div class="pt-3 sticky top-0 bg-white pb-2 border-(0 b solid gray-2) z-1">
    <div class="flex items-center gap-3 text-xl lg:text-2xl">
      <a v-if="showBack" class="cursor-pointer flex" @click="back">
        <span class="inline-flex text-lg bg-gray-100 p-1 rounded">
          <ArrowLeft></ArrowLeft>
        </span>
      </a>
      <slot>{{ title }} </slot>
    </div>
  </div>
</template>

<style lang="less" scoped></style>
