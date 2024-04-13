<script lang="ts" setup>
import { rand } from '@vueuse/core'
import VIcon from './VIcon.vue'
// todo, check why
//@ts-ignore
import { changeBrand } from '@0x-jerry/unocss-preset-brand/runtime'

const grayColors = ['Slate', 'Gray', 'Zinc', 'Neutral', 'Stone'].map((n) =>
  n.toLowerCase(),
)
const colors = [
  'Red',
  'Orange',
  'Amber',
  'Yellow',
  'Lime',
  'Green',
  'Emerald',
  'Teal',
  'Cyan',
  'Sky',
  'Blue',
  'Indigo',
  'Violet',
  'Purple',
  'Fuchsia',
  'Pink',
  'Rose',
].map((n) => n.toLowerCase())

function randomBrand() {
  const gray = grayColors[rand(0, grayColors.length)]
  const primary = colors[rand(0, colors.length)]
  changeBrand({
    gray,
    primary,
  })
}
</script>

<template>
  <VIcon
    class="i-carbon:color-palette cursor-pointer hover:text-bPrimary"
    @click="randomBrand"
  />
</template>

<style lang="less" scoped></style>
