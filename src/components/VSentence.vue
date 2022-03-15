<script lang="ts" setup>
import { computed, ref } from 'vue'

const isFetched = ref(false)

const data = ref<any>({})

async function fetchHitokoto() {
  const url = 'https://api.0x-jerry.icu/hitokoto?t=' + new Date().getTime()
  const res = await fetch(url)
  data.value = await res.json()
  isFetched.value = true
}

const from = computed(() => [data.value?.from, data.value?.from_who].filter(Boolean).join(' - '))

if (!import.meta.env.SSR) fetchHitokoto()
</script>

<template>
  <template v-if="!isFetched">
    <slot></slot>
  </template>
  <div v-else class="v-sentence" text="center" @click="fetchHitokoto" cursor="pointer">
    <p font="italic">「 {{ data?.hitokoto }} 」</p>
    <br />
    <p text="right">--- {{ from }}</p>
  </div>
</template>

<style></style>
