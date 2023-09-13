<script lang="ts" setup>
import { computed, ref } from 'vue'

const isFetched = ref(false)

const data = ref<any>({})

async function fetchHitokoto() {
  const url = 'https://0x-jerry.icu/api/hitokoto?t=' + new Date().getTime()
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
  <div v-else class="v-sentence text-center cursor-pointer px-4"  @click="fetchHitokoto" >
    <p class="font-italic">「 {{ data?.hitokoto }} 」</p>
    <br />
    <p class="text-right">--- {{ from }}</p>
  </div>
</template>

<style></style>
