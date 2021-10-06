<script lang="ts" setup>
import { useFetch } from '@vueuse/core'

const url = 'https://api.0x-jerry.icu/hitokoto?t=' + new Date().getTime()

const { data, isFetching } = useFetch(url).get().json()
</script>

<template>
  <template v-if="isFetching">
    <slot></slot>
  </template>
  <div v-else class="v-sentence" text="center">
    <p font="italic">{{ data?.hitokoto }}</p>
    <br />
    <p text="right">
      --- 《{{ data?.from }}<span v-if="data?.from_who"> - {{ data?.from_who }}</span
      >》
    </p>
  </div>
</template>

<style></style>
