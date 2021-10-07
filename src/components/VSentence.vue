<script lang="ts" setup>
import { useFetch } from '@vueuse/core'
import { computed } from 'vue'

const url = 'https://api.0x-jerry.icu/hitokoto?t=' + new Date().getTime()

const { data, isFetching } = useFetch(url).get().json()

const from = computed(() => [data.value?.from, data.value?.from_who].filter(Boolean).join(' - '))
</script>

<template>
  <template v-if="isFetching">
    <slot></slot>
  </template>
  <div v-else class="v-sentence" text="center">
    <p font="italic">「 {{ data?.hitokoto }} 」</p>
    <br />
    <p text="right">--- 《{{ from }}》</p>
  </div>
</template>

<style></style>
